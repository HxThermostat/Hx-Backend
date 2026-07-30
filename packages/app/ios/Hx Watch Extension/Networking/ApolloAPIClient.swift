//
//  ApolloAPIClient.swift
//  Hx WatchKit Extension
//
//  Created by Max Meyers on 7/10/20.
//  Copyright © 2020 Max Meyers. All rights reserved.
//

import Apollo
import Foundation
import HxGraph

let hxCloudUrl = URL(string: "https://hx.yoursysteminfo.com/graphql")!

class ApolloAPIClient: APIClient {
    static var shared = ApolloAPIClient()
    
    weak var authenticationDelegate: APIClientAuthenticationDelegate?

    private let legacyInterceptorProvider = LegacyInterceptorProvider()

    private lazy var apollo = RetryingApolloClient(
        apolloClient: ApolloClient(
          networkTransport: RequestChainNetworkTransport(
            interceptorProvider: self,
            endpointURL: hxCloudUrl
          )
        )
    )
    
    var useBadTokenOnNextRequest = false
    
    @discardableResult func getLocations(
        withCallback callback: @escaping (Result<[Location], Error>) -> Void
    ) -> Cancelable {
        let locationFetch = apollo.fetch(
            query: LocationsQuery(),
            cachePolicy: .fetchIgnoringCacheData
        ) { result in
            switch result {
            case .success(let response):
                if response.data?.me == nil {
                    self.authenticationDelegate?.requestFailedToAuthenticate()
                    callback(.failure(APIError.unauthenticated))
                    return
                }
                
                let locations = (response.data?.locations ?? []).compactMap {
                    return Location(locationFragment: $0.fragments.locationFragment)
                }
              
              switch response.data?.me?.temperatureUnit.rawValue {
              case "C":
                TemperatureUnitManager.shared.temperatureUnit = UnitTemperature.celsius
              default:
                TemperatureUnitManager.shared.temperatureUnit = UnitTemperature.fahrenheit
              }
              
              
              
                callback(.success(locations))
            case .failure(let error):
                callback(.failure(error))
            }
        }
        
        return ApolloCancelable(apolloCancellable: locationFetch)
    }
    
    func updateLocationAway(
        locationId: String,
        isAway: Bool,
        callback: @escaping RemoteHomeUpdateCallback
    ) {
        perform(
            mutation: ChangeLocationAwayMutation(locationId: locationId, active: isAway)
        ) { result in
            switch result {
            case .success(let response):
                guard let graphLocation =
                  response.data?.changeLocationAway.asChangeLocationAwaySuccess?.location,
                  let location = Location(locationFragment: graphLocation.fragments.locationFragment) else {
                        callback(.failure(APIError.invalidData))
                        return
                }
                callback(.success(location))
            case .failure(let error):
                callback(.failure(error))
            }
        }
    }
    
    func updateAirflow(
        locationId: String,
        airflow: Double,
        callback: @escaping RemoteHomeUpdateCallback
    ) {
        perform(mutation: ChangeFanCfmMutation(locationId: locationId, cfm: airflow)) { result in
            switch result {
            case .success(let response):
                guard let graphLocation =
                    response.data?.changeFanCfm.asChangeFanCfmSuccess?.location,
                  let location = Location(locationFragment: graphLocation.fragments.locationFragment) else {
                        callback(.failure(APIError.invalidData))
                        return
                }
                callback(.success(location))
            case .failure(let error):
                callback(.failure(error))
            }
        }
    }
    
    func updateZoneAway(
        zoneId: String,
        isAway: Bool,
        callback: @escaping RemoteZoneUpdateCallback
    ) {
        perform(mutation: ChangeAwayMutation(controllerId: zoneId, active: isAway)) { result in
            switch result {
            case .success(let response):
                guard let zoneFragment =
                    response.data?.changeAway.asChangeAwaySuccess?.controller.zoneFragment,
                let zone = Zone(zoneFragment: zoneFragment) else {
                        callback(.failure(APIError.invalidData))
                        return
                }
                callback(.success(zone))
            case .failure(let error):
                callback(.failure(error))
            }
        }
    }
    
    func updateSetpoint(
        zoneId: String,
        temperature: Temperature,
        setpointType: SetpointType,
        callback: @escaping RemoteZoneUpdateCallback
    ) {
        perform(
            mutation: ChangeSetpointMutation(
                controllerId: zoneId,
                setpoint: setpointType.graphSetpoint,
                value: temperature
            )
        ) { result in
            switch result {
            case .success(let response):
                guard let zoneFragment =
                    response.data?.changeSetpoint.asChangeSetpointSuccess?.controller.zoneFragment,
                  let zone = Zone(zoneFragment: zoneFragment)
                    else {
                        callback(.failure(APIError.invalidData))
                        return
                }
                callback(.success(zone))
            case .failure(let error):
                callback(.failure(error))
            }
        }
    }
    
    func updateMode(zoneId: String, mode: Mode, callback: @escaping RemoteZoneUpdateCallback) {
        perform(
            mutation: ChangeModeMutation(controllerId: zoneId, mode: mode.graphMode)
        ) { result in
            switch result {
            case .success(let response):
                guard let zoneFragment =
                    response.data?.changeMode.asChangeModeSuccess?.controller.zoneFragment,
                  let zone = Zone(zoneFragment: zoneFragment) else {
                        callback(.failure(APIError.invalidData))
                        return
                }
                callback(.success(zone))
            case .failure(let error):
                callback(.failure(error))
            }
        }
    }
    
    func updateFanMode(
        zoneId: String,
        fanMode: FanMode,
        callback: @escaping RemoteZoneUpdateCallback
    ) {
        perform(
            mutation: ChangeFanModeMutation(controllerId: zoneId, mode: fanMode.graphFanMode)
        ) { result in
            switch result {
            case .success(let response):
                guard let zoneFragment =
                    response.data?.changeFanMode.asChangeFanModeSuccess?.controller.zoneFragment,
                  let zone = Zone(zoneFragment: zoneFragment)
                    else {
                        callback(.failure(APIError.invalidData))
                        return
                }
                callback(.success(zone))
            case .failure(let error):
                callback(.failure(error))
            }
        }
    }
    
    func cancelTemperatureHold(zoneId: String, callback: @escaping RemoteZoneUpdateCallback) {
        perform(
            mutation: CancelTemperatureHoldMutation(controllerId: zoneId)
        ) { result in
            switch result {
            case .success(let response):
                guard let zoneFragment =
                    response.data?.cancelTemperatureHold.asCancelTemperatureHoldSuccess?.controller.zoneFragment,
                  let zone = Zone(zoneFragment: zoneFragment)
                    else {
                        callback(.failure(APIError.invalidData))
                        return
                }
                callback(.success(zone))
            case .failure(let error):
                callback(.failure(error))
            }
        }
    }
    
    @discardableResult private func perform<Mutation: GraphQLMutation>(
        mutation: Mutation,
        resultHandler: GraphQLResultHandler<Mutation.Data>? = nil
    ) -> Cancelable {
        let cancellable = apollo.perform(mutation: mutation) { result in
            switch result {
            case .success(let graphResult):
                if graphResult.isUnauthenticated {
                    self.authenticationDelegate?.requestFailedToAuthenticate()
                    resultHandler?(.failure(APIError.unauthenticated))
                } else {
                    resultHandler?(.success(graphResult))
                }
            case .failure(let error):
                resultHandler?(.failure(error))
            }
        }
        return ApolloCancelable(apolloCancellable: cancellable)
    }
}

enum ApolloAPIClientError: Error {
    case noAccessToken
}

extension ApolloAPIClient: ApolloInterceptor, InterceptorProvider {
    func interceptors<Operation>(for operation: Operation) -> [ApolloInterceptor] where Operation : GraphQLOperation {
        var interceptors = legacyInterceptorProvider.interceptors(for: operation)
        interceptors.insert(self, at: 0)
        return interceptors
    }
  
    func interceptAsync<Operation>(chain: RequestChain, request: HTTPRequest<Operation>, response: HTTPResponse<Operation>?, completion: @escaping (Result<GraphQLResult<Operation.Data>, Error>) -> Void) where Operation : GraphQLOperation {
        if let accessToken = authenticationDelegate?.accessTokenForAPIClient(self) {
            request.addHeader(name: "Authorization", value: "Bearer \(accessToken)")
        }

        chain.proceedAsync(request: request, response: response, completion: completion)
    }
}

private extension GraphQLResult {
    var isUnauthenticated: Bool {
        guard let errors = errors else {
            return false
        }
        
        let unauthenticatedErrors = errors.filter {
            if let code = $0.extensions?["code"] as? String, code == "UNAUTHENTICATED" {
                return true
            } else {
                return false
            }
        }
        
        return unauthenticatedErrors.count > 0
    }
}

private struct ApolloCancelable: Cancelable {
    let apolloCancellable: Apollo.Cancellable
    
    func cancel() {
        apolloCancellable.cancel()
    }
}

protocol AsZoneFragment {
    var zoneFragment: ZoneFragment? { get }
}

extension ChangeAwayMutation.Data.ChangeAway.AsChangeAwaySuccess.Controller: AsZoneFragment {
    var zoneFragment: ZoneFragment? {
      return fragments.zoneFragment;
    }
}

extension ChangeSetpointMutation.Data.ChangeSetpoint.AsChangeSetpointSuccess.Controller: AsZoneFragment {
    var zoneFragment: ZoneFragment? {
        return fragments.zoneFragment;
    }
}

extension ChangeModeMutation.Data.ChangeMode.AsChangeModeSuccess.Controller: AsZoneFragment {
    var zoneFragment: ZoneFragment? {
        return fragments.zoneFragment;
    }
}

extension ChangeFanModeMutation.Data.ChangeFanMode.AsChangeFanModeSuccess.Controller: AsZoneFragment {
    var zoneFragment: ZoneFragment? {
        return fragments.zoneFragment;
    }
}

extension CancelTemperatureHoldMutation.Data.CancelTemperatureHold.AsCancelTemperatureHoldSuccess.Controller: AsZoneFragment {
    var zoneFragment: ZoneFragment? {
        return fragments.zoneFragment;
    }
}

