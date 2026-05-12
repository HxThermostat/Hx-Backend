//
//  Updater.swift
//  Hx WatchKit Extension
//
//  Created by Max Meyers on 7/8/20.
//  Copyright © 2020 Max Meyers. All rights reserved.
//

import Foundation

protocol UpdaterDelegate: class where Self: UpdaterErrorDelegate {
    func updateZone(_ zone: Zone)
    func updateLocation(_ location: Location)
}

protocol UpdaterErrorDelegate {
    func showUpdateError(_ updateError: Updater.UpdateError)
}

// Default implementations
extension UpdaterDelegate {
    func updateZone(_ zone: Zone) {}
    func updateLocation(_ location: Location) {}
}

class Updater {
    enum Update {
        case zoneUpdate(ZoneUpdate)
        case locationUpdate(LocationUpdate)
        
        fileprivate static var setpointCoolIdentifier = "setpoint-cool"
        fileprivate static var setpointHeatdentifier = "setpoint-heat"
        
        fileprivate var identifier: String {
            switch self {
            case .zoneUpdate(let zoneUpdate):
                switch zoneUpdate {
                case .away: return "zone-away"
                case .setpoint(_, let setpointType):
                    switch setpointType {
                    case .cool: return Update.setpointCoolIdentifier
                    case .heat: return Update.setpointHeatdentifier
                    }
                case .mode: return "mode"
                case .fanMode: return "fanMode"
                case .cancelTempOverride: return "cancelTempOverride"
                }
            case .locationUpdate(let locationUpdate):
                switch locationUpdate {
                case .away: return "location-away"
                case .airflow: return "airflow"
                }
            }
        }
    }
    
    class UpdateError: NSObject {
        init(message: String) {
            self.message = message
        }
        
        let message: String
    }
    
    private let zoneInfo: ZoneInfo
    
    private var zone: Zone? // this zone is only updated by the ZoneManager
    private var location: Location?
    
    private var update: Any?
    
    private var delayedUpdates: [String: (Update, Timer)] = [:]
    
    private var operationCount = 0
    
    weak var delegate: UpdaterDelegate? = nil
    
    init(zoneInfo: ZoneInfo, delegate: UpdaterDelegate? = nil) {
        self.zoneInfo = zoneInfo
        self.delegate = delegate
        
        zone = ZoneManager.shared.getZone(zoneId: zoneInfo.zoneId)
        ZoneManager.shared.subscribeToZone(zoneId: zoneInfo.zoneId, zoneUpdatable: self)
        
        location = ZoneManager.shared.getLocation(locationId: zoneInfo.locationId)
        ZoneManager.shared.subscribeToLocation(
            locationId: zoneInfo.locationId,
            locationUpdatable: self
        )
    }
    
    deinit {
        self.performUpdateIfNecessary()
    }
    
    func update(_ update: Update, withDelay delay: TimeInterval? = nil) {
        // If we're canceling the temp override, we don't want any setpoint updates to go out.
        if case .zoneUpdate(.cancelTempOverride) = update {
            [Update.setpointCoolIdentifier, Update.setpointHeatdentifier].forEach {
                if let (_, timer) = delayedUpdates[$0] {
                    timer.invalidate()
                }
                delayedUpdates[$0] = nil
            }
        }
        
        guard let delay = delay else {
            print("Performing update \"\(update.identifier)\" immediately")
            performUpdate(update)
            return
        }
        
        if let (_, existingTimer) = delayedUpdates[update.identifier] {
            existingTimer.invalidate()
        }
        
        let timer = Timer.scheduledTimer(withTimeInterval: delay, repeats: false) { [weak self] _ in
            guard let self = self else { return }
            print("Performing update \"\(update.identifier)\" after \(delay) seconds")
            self.performUpdate(update)
            self.delayedUpdates[update.identifier] = nil
        }
        delayedUpdates[update.identifier] = (update, timer)
    }
    
    private func performUpdateIfNecessary() {
        delayedUpdates.forEach { (key, value) in
            let (update, timer) = value
            timer.invalidate()
            performUpdate(update)
        }
        delayedUpdates = [:]
    }
    
    private func performUpdate(_ update: Update) {
        switch update {
        case .zoneUpdate(let zoneUpdate):
            performZoneUpdate(zoneUpdate)
        case .locationUpdate(let locationUpdate):
            performLocationUpdate(locationUpdate)
        }
    }
    
    private func performZoneUpdate(_ zoneUpdate: ZoneUpdate) {
        ZoneManager.shared.performZoneUpdate(
            zoneUpdate,
            forZoneWithId: zoneInfo.zoneId
        ) { [weak self] result in
            DispatchQueue.asyncMainIfNeeded {
                guard let self = self else {
                    let identifier = Update.zoneUpdate(zoneUpdate).identifier
                    print("Zone update \(identifier) completed after updater was destroyed")
                    return
                }
                self.operationCount -= 1
                
                switch result {
                case .success(let zone):
                    self.zoneUpdated(zone)
                case .failure:
                    if let zone = self.zone {
                        self.delegate?.updateZone(zone)
                    }
                    self.delegate?.showUpdateError(zoneUpdate.error)
                }
            }
        }
        
        operationCount += 1
    }
    
    private func performLocationUpdate(_ locationUpdate: LocationUpdate) {
        ZoneManager.shared.performLocationUpdate(
            locationUpdate,
            forLocationWithId: zoneInfo.locationId
        ) { [weak self] result in
            guard let self = self else {
                let identifier = Update.locationUpdate(locationUpdate).identifier
                print("Location update \(identifier) completed after updater was destroyed")
                return
            }
            self.operationCount -= 1
            
            switch result {
            case .success(let location):
                self.locationUpdated(location)
            case .failure:
                if let location = self.location {
                    self.delegate?.updateLocation(location)
                }
                self.delegate?.showUpdateError(locationUpdate.error)
            }
        }
        
        operationCount += 1
    }
}

extension Updater: ZoneUpdatable, LocationUpdatable {
    var isWaitingForTimerOrCallback: Bool {
        return delayedUpdates.keys.count > 0 || operationCount > 0
    }
    
    func zoneUpdated(_ zone: Zone) {
        DispatchQueue.main.async {
            guard !self.isWaitingForTimerOrCallback else { return }
            
            self.zone = zone
            self.delegate?.updateZone(zone)
        }
    }
    
    func locationUpdated(_ location: Location) {
        DispatchQueue.main.async {
            guard !self.isWaitingForTimerOrCallback else { return }
            
            self.location = location
            self.delegate?.updateLocation(location)
        }
    }
}

fileprivate extension ZoneUpdate {
    var error: Updater.UpdateError {
        let message: String
        switch self {
        case .away:
            message = NSLocalizedString(
                "Error.ZoneUpdate.Away",
                comment: "An error message displayed when an away state change fails"
            )
        case .setpoint:
            message = NSLocalizedString(
                "Error.ZoneUpdate.Setpoint",
                comment: "An error message displayed when a temperature change fails"
            )
        case .mode:
            message = NSLocalizedString(
                "Error.ZoneUpdate.Mode",
                comment: "An error message displayed when a mode change fails"
            )
        case .fanMode:
            message = NSLocalizedString(
                "Error.ZoneUpdate.FanMode",
                comment: "An error message displayed when a fan mode change fails"
            )
        case .cancelTempOverride:
            message = NSLocalizedString(
                "Error.ZoneUpdate.Setpoint",
                comment: "An error message displayed when cancelling override fails"
            )
        }
        return Updater.UpdateError(message: message)
    }
}

fileprivate extension LocationUpdate {
    var error: Updater.UpdateError {
        let message: String
        switch self {
        case .away:
            message = NSLocalizedString(
                "Error.LocationUpdate.Away",
                comment: "An error message displayed when a home away state change fails"
            )
        case .airflow:
            message = NSLocalizedString(
                "Error.ZoneUpdate.Setpoint",
                comment: "An error message displayed when an airflow change fails"
            )
        }
        return Updater.UpdateError(message: message)
    }
}
