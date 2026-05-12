//
//  ZoneManager.swift
//  Hx WatchKit Extension
//
//  Created by Max Meyers on 7/10/20.
//  Copyright © 2020 Max Meyers. All rights reserved.
//

import Foundation

enum ZoneUpdate {
    case away(Bool)
    case setpoint(Temperature, SetpointType)
    case mode(Mode)
    case fanMode(FanMode)
    case cancelTempOverride
}

enum LocationUpdate {
    case away(Bool)
    case airflow(Double)
}

protocol ZoneUpdatable: class {
    func zoneUpdated(_ zone: Zone)
}

protocol LocationUpdatable: class {
    func locationUpdated(_ location: Location)
}

protocol LocationsUpdatable: class {
    func locationsUpdated(_ locations: [Location])
}

class ZoneManager {
    static var shared = ZoneManager()
    
    private let apiClient: APIClient = getAPIClient()
    
    private var locations = [Location]()
    private var zones: [Zone] {
        return locations.flatMap { $0.zones }
    }
    
    private var zoneSubscribers = [(zoneId: String, updatable: WeakZoneUpdatable)]()
    private var locationSubscribers = [(locationId: String, updatable: WeakLocationUpdatable)]()
    private var locationsSubscribers = [WeakLocationsUpdatable]()
    
    private var updateTimer: Timer?
    private var currentUpdate: Cancelable?
    
    private var operationCount: Int = 0
    
    init() {
        updateTimer = Timer.scheduledTimer(withTimeInterval: 5, repeats: true, block: { [weak self] _ in
            self?.getLatestLocations()
        })
    }
    
    func setLocations(_ locations: [Location]) {
        self.locations = locations
        self.locationsSubscribers.forEach { $0.locationsUpdatable?.locationsUpdated(locations) }
    }
    
    func getLocation(locationId: String) -> Location? {
        return locations.first { $0.id == locationId }
    }
    
    func updateLocation(location: Location) {
        locations = locations.map {
            $0.id == location.id ? location : $0
        }
        locationSubscribers.forEach { subscriber in
            if subscriber.locationId == location.id {
                subscriber.updatable.locationUpdatable?.locationUpdated(location)
            }
        }
        
        // Clean out dead subscribers
        locationSubscribers = locationSubscribers.filter { $0.updatable.locationUpdatable != nil }
    }
        
    func updateZone(_ zone: Zone) {
        locations = locations.map {
            var location = $0
            location.zones = location.zones.map {
                if $0.id == zone.id {
                    return zone
                } else {
                    return $0
                }
            }
            return location
        }
                
        zoneSubscribers.forEach { subscriber in
            if subscriber.zoneId == zone.id {
                subscriber.updatable.zoneUpdatable?.zoneUpdated(zone)
            }
        }
        
        // Clean out dead subscribers
        zoneSubscribers = zoneSubscribers.filter { $0.updatable.zoneUpdatable != nil }
    }
    
    func getZone(zoneId: String) -> Zone? {
        return zones.first { $0.id == zoneId }
    }
    
    func subscribeToZone(zoneId: String, zoneUpdatable: ZoneUpdatable) {
        zoneSubscribers.append((zoneId, WeakZoneUpdatable(zoneUpdatable: zoneUpdatable)))
    }
    
    func subscribeToLocation(locationId: String, locationUpdatable: LocationUpdatable) {
        locationSubscribers.append((locationId, WeakLocationUpdatable(locationUpdatable: locationUpdatable)))
    }
    
    func subscribeToLocations(locationsUpdatable: LocationsUpdatable) {
        locationsSubscribers.append(WeakLocationsUpdatable(locationsUpdatable: locationsUpdatable))
    }
    
    func performZoneUpdate(_ update: ZoneUpdate, forZoneWithId zoneId: String, callback: @escaping RemoteZoneUpdateCallback) {
        cancelOngoingLocationsUpdate()

        let callback: RemoteZoneUpdateCallback = { [weak self] result in
            guard let self = self else { return }
            
            self.operationCount -= 1
            
            if case .success(let zone) = result {
                self.updateZone(zone)
            }
            
            callback(result)
        }
        
        switch update {
        case .setpoint(let temperature, let setpointType):
            apiClient.updateSetpoint(zoneId: zoneId, temperature: temperature, setpointType: setpointType, callback: callback)
        case .away(let isAway):
            apiClient.updateZoneAway(zoneId: zoneId, isAway: isAway, callback: callback)
        case .mode(let mode):
            apiClient.updateMode(zoneId: zoneId, mode: mode, callback: callback)
        case .fanMode(let fanMode):
            apiClient.updateFanMode(zoneId: zoneId, fanMode: fanMode, callback: callback)
        case .cancelTempOverride:
            apiClient.cancelTemperatureHold(zoneId: zoneId, callback: callback)
        }
        
        operationCount += 1
    }
    
    func performLocationUpdate(_ update: LocationUpdate, forLocationWithId locationId: String, callback: @escaping RemoteHomeUpdateCallback) {
        cancelOngoingLocationsUpdate()

        let callback: RemoteHomeUpdateCallback = { [weak self] result in
            guard let self = self else { return }
            
            self.operationCount -= 1

            switch result {
            case .success(let location):
                self.updateLocation(location: location)
                callback(.success(location))
            case .failure(let error):
                callback(.failure(error))
            }
        }

        switch update {
        case .away(let isAway):
            apiClient.updateLocationAway(locationId: locationId, isAway: isAway, callback: callback)
        case .airflow(let airflow):
            apiClient.updateAirflow(locationId: locationId, airflow: airflow, callback: callback)
        }
        
        operationCount += 1
    }
    
    func getLatestLocations() {
        cancelOngoingLocationsUpdate()
        
        guard operationCount == 0 else {
            return
        }
        
        currentUpdate = apiClient.getLocations { [weak self] result in
            guard let self = self else { return }
            
            guard case .success(let locations) = result else {
                return
            }
            
            self.setLocations(locations)

            self.zones.forEach {
                self.updateZone($0)
            }
        }
    }
    
    private func cancelOngoingLocationsUpdate() {
        currentUpdate?.cancel()
        currentUpdate = nil
    }
}

private final class WeakZoneUpdatable {
    init(zoneUpdatable: ZoneUpdatable) {
        self.zoneUpdatable = zoneUpdatable
    }
    
    weak var zoneUpdatable: ZoneUpdatable?
}

private final class WeakLocationUpdatable {
    init(locationUpdatable: LocationUpdatable) {
        self.locationUpdatable = locationUpdatable
    }
    
    weak var locationUpdatable: LocationUpdatable?
}

private final class WeakLocationsUpdatable {
    init(locationsUpdatable: LocationsUpdatable) {
        self.locationsUpdatable = locationsUpdatable
    }
    
    weak var locationsUpdatable: LocationsUpdatable?
}
