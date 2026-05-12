//
//  AppStateManager.swift
//  Hx WatchKit Extension
//
//  Created by Max Meyers on 7/16/20.
//  Copyright © 2020 Max Meyers. All rights reserved.
//

import Foundation
import WatchKit

enum AppState {
    enum LoadError {
        case token(Error)
        case locations(AccessToken, Error)
    }
    
    case initial
    case loadingToken
    case loadingLocations(AccessToken)
    case loadFailed(LoadError)
    case loggedOut
    case zone(ZoneInfo, AccessToken)
    case zones([Location], AccessToken)
    
    var debugName: String {
        switch self {
        case .initial: return "Initial"
        case .loadingToken: return "Loading-Tokens"
        case .loadingLocations: return "Loading-Locations"
        case .loadFailed: return "Load-Failed"
        case .loggedOut: return "Logged-Out"
        case .zone: return "Zone"
        case .zones(let zones, _): return "Zones-(\(zones.count))"
        }
    }
    
    var accessToken: AccessToken? {
        switch self {
        case .loadingLocations(let accessToken),
             .zone(_, let accessToken),
             .zones(_, let accessToken):
            return accessToken
        default:
            return nil
        }
    }
}

protocol RefreshTokenDataSource: class {
    func activate(callback: @escaping ((Error?) -> Void))
    var refreshToken: String? { get set }
}

class AppStateManager {
    static let shared = AppStateManager(
        authenticationClient: getAuthenticationClient(),
        apiClient: getAPIClient()
    )
    
    private var appState: AppState = .initial {
        didSet {
            print("Updating app state from: \(oldValue.debugName) to \(appState.debugName)")
            resetInterface()
        }
    }
    
    private var interface: (interfaceName: String, context: AnyObject)? {
        didSet {
            guard let interface = interface else { return }
            
            // We don't need to reload the root screen, it's just a loading spinner
            guard !(interface.interfaceName == "Root" && oldValue?.interfaceName == "Root") else {
                return
            }   
            
            DispatchQueue.asyncMainIfNeeded {
                WKInterfaceController.reloadRootControllers(withNamesAndContexts:
                    [(interface.interfaceName, interface.context)]
                )
            }
        }
    }
    
    weak var refreshTokenDataSource: RefreshTokenDataSource?
    private let authenticationClient: AuthenticationClient
    private let apiClient: APIClient
    
    private var loginTimer: Timer?
    
    private var refreshToken: String? {
        get {
            return refreshTokenDataSource?.refreshToken
        }
        set {
            refreshTokenDataSource?.refreshToken = newValue
        }
    }

    init(
        authenticationClient: AuthenticationClient,
        apiClient: APIClient
    ) {
        self.authenticationClient = authenticationClient
        self.apiClient = apiClient
        
        loginTimer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { [weak self] _ in
            DispatchQueue.asyncMainIfNeeded {
                guard let self = self else { return }
                switch self.appState {
                    case .loggedOut:
                        if self.refreshToken != nil {
                            self.appState = .initial
                            self.start()
                        }
                    default:
                        if self.refreshToken == nil {
                            self.appState = .loggedOut
                        }
                }
            }
        }
    }
    
    func start() {
        guard Thread.current.isMainThread else {
            DispatchQueue.main.async { self.start() }
            return
        }
        
        guard case .initial = appState else {
            return
        }
        
        if let refreshToken = self.refreshToken {
            appState = .loadingToken
            authenticationClient.refreshTokens(refreshToken: refreshToken) { result in
                DispatchQueue.asyncMainIfNeeded {
                    switch result {
                    case .success(let authTokens):
                        self.refreshToken = authTokens.refreshToken
                        self.loadLocations(accessToken: authTokens.accessToken)
                    case .failure(let error):
                      if case APIError.unauthenticated = error {
                        self.refreshToken = nil
                        self.appState = .loggedOut
                      } else {
                        self.appState = .loadFailed(.token(error))
                      }
                    }
                }
            }
        } else {
            appState = .loggedOut
        }
    }
    
    private func loadLocations(accessToken: AccessToken) {
        guard Thread.current.isMainThread else {
            DispatchQueue.main.async { self.loadLocations(accessToken: accessToken) }
            return
        }
        
        appState = .loadingLocations(accessToken)

        apiClient.getLocations { (result) in
            DispatchQueue.asyncMainIfNeeded {
                switch result {
                case .success(let locations):
                    ZoneManager.shared.setLocations(locations)
                    self.setAppState(withLocations: locations, accessToken: accessToken)
                case .failure(let error):
                    print("Failed to load locations: \(error.localizedDescription)")
                    self.appState = .loadFailed(.locations(accessToken, error))
                }
            }
        }
    }
    
    private func retryError(_ loadError: AppState.LoadError) {
        DispatchQueue.asyncMainIfNeeded {
            switch loadError {
            case .token:
                self.appState = .initial
                self.start()
            case .locations(let accessToken, _):
                self.loadLocations(accessToken: accessToken)
            }
        }
    }
    
    private func setAppState(withLocations locations: [Location], accessToken: AccessToken) {
        locations.forEach { location in
            location.zones.forEach {
                ZoneManager.shared.updateZone($0)
            }
        }
        
        let zoneInfos = locations.flatMap { (location) -> [ZoneInfo] in
            return location.zones.map { zone in ZoneInfo(zoneId: zone.id, locationId: location.id) }
        }
        
        if zoneInfos.count == 1 {
            let zoneInfo = zoneInfos[0]
            appState = .zone(zoneInfo, accessToken)
        } else {
            appState = .zones(locations, accessToken)
        }
    }
    
    private func resetInterface() {
        let interfaceName: String
        let context: AnyObject
        switch appState {
        case .initial, .loadingToken, .loadingLocations:
            interfaceName = "Root"
            context = "" as AnyObject
        case .loadFailed(let error):
            interfaceName = "Error"
            
          #if DEBUG
          let title: String
          switch error {
          case .token(let aError):
            title = "Token Error: \(aError.localizedDescription)"
          case .locations(_, let aError):
            title = "Locations Error: \(aError.localizedDescription)"
          }
          #else
            let title = NSLocalizedString(
                "Error.LoadFailed",
                comment: "An error that shows when loading thermostat data failed."
            )
          #endif
            let retryTitle = NSLocalizedString(
                "Error.Retry",
                comment: "A retry button that shows on an error screen"
            )
            
            context = ErrorContext(
                title: title,
                action: (title: retryTitle, block: { [weak self] in self?.retryError(error) })
            ) as AnyObject
        case .loggedOut:
            interfaceName = "Message"
            let message = NSLocalizedString(
                "Message.LoggedOut",
                comment: "A message that instructs the user to login on their phone"
            )
            context = message as AnyObject
        case .zone(let zoneInfo, _):
            interfaceName = "Zone"
            context = zoneInfo as AnyObject
        case .zones(let locations, _):
            if locations.count > 0 {
                interfaceName = "ZoneList"
                context = locations as AnyObject
            } else {
                interfaceName = "Message"
                let message = NSLocalizedString(
                    "Message.NoZones",
                    comment: "A message that instructs the user to connect a thermostat"
                )
                context = message as AnyObject
            }
        }
        interface = (interfaceName, context)
    }
}

extension AppStateManager: APIClientAuthenticationDelegate {
    func accessTokenForAPIClient(_ apiClient: APIClient) -> String? {
        return appState.accessToken?.token
    }
    
    func requestFailedToAuthenticate() {
        if !Thread.current.isMainThread {
            DispatchQueue.main.async { self.requestFailedToAuthenticate() }
            return
        }
        appState = .initial
        start()
    }
}
