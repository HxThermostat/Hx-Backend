//
//  FakeLocationManager.swift
//  Hx WatchKit Extension
//
//  Created by Max Meyers on 7/3/20.
//  Copyright © 2020 Max Meyers. All rights reserved.
//

import Foundation

class FakeLocationManager: AuthenticationClient, APIClient {
    var authenticationDelegate: APIClientAuthenticationDelegate?
    
    struct FakeError: Error {}
    class Cancel: Cancelable {
        var canceled: Bool = false
        
        func cancel() {
            canceled = true
        }
    }

    static var shared = FakeLocationManager()
    
    var accessToken: String = UUID().uuidString
    var locations: [Location] = []
    var fakeDelay: TimeInterval = 0.75
    
    func refreshTokens(refreshToken: String, callback: @escaping (Result<AuthTokens, Error>) -> Void) {
        DispatchQueue.global().asyncAfter(deadline: .now() + fakeDelay) {
            callback(.success(AuthTokens(
                refreshToken: UUID().uuidString,
                accessToken: (UUID().uuidString, 86400)
            )))
        }
    }
    
    func getLocations(withCallback callback: @escaping (Result<[Location], Error>) -> Void) -> Cancelable {
        let cancel = Cancel()
        DispatchQueue.global().asyncAfter(deadline: .now() + fakeDelay) {
            if cancel.canceled {
                callback(.failure(FakeError()))
            } else {
                callback(.success(self.locations))
            }
        }
        return cancel
    }
    
    func updateZoneAway(zoneId: String, isAway: Bool, callback: @escaping RemoteZoneUpdateCallback) {
        DispatchQueue.global().asyncAfter(deadline: .now() + fakeDelay) {
            let updatedZone = self.updateZone(zoneId: zoneId) { (zone) -> Zone in
                var newZone = zone
                newZone.away = isAway
                return newZone
            }
            callback(.success(updatedZone))
        }
    }
    
    func updateAirflow(locationId: String, airflow: Double, callback: @escaping RemoteHomeUpdateCallback) {
        DispatchQueue.global().asyncAfter(deadline: .now() + fakeDelay) {
            let updatedLocation = self.updateLocation(locationId: locationId) { (location) -> Location in
                var newLocation = location
                newLocation.zones = newLocation.zones.map { (zone) -> Zone in
                    var newZone = zone
                    newZone.airflow = .configurable(airflow)
                    return newZone
                }
                return newLocation
            }
            callback(.success(updatedLocation))
        }
    }
    
    func updateLocationAway(locationId: String, isAway: Bool, callback: @escaping RemoteHomeUpdateCallback) {
        DispatchQueue.global().asyncAfter(deadline: .now() + fakeDelay) {
            let updatedLocation = self.updateLocation(locationId: locationId) {
                return Location(
                    id: locationId,
                    name: $0.name,
                    online: $0.online,
                    programmable: $0.programmable,
                    awayState: .configurable(isAway),
                    zones: $0.zones
                )
            }
            callback(.success(updatedLocation))
        }
    }
    
    
    func updateSetpoint(zoneId: String, temperature: Temperature, setpointType: SetpointType, callback: @escaping RemoteZoneUpdateCallback) {
        DispatchQueue.global().asyncAfter(deadline: .now() + fakeDelay) {
            if temperature == 69 {
                callback(.failure(FakeError()))
                return
            }
            
            let updatedZone = self.updateZone(zoneId: zoneId) { (zone) -> Zone in
                var newZone = zone
                switch setpointType {
                case .heat:
                    newZone.setpoint.heat = temperature
                case .cool:
                    newZone.setpoint.cool = temperature
                }
                return newZone
            }
            callback(.success(updatedZone))
        }
    }
    
    func updateMode(zoneId: String, mode: Mode, callback: @escaping RemoteZoneUpdateCallback) {
        DispatchQueue.global().asyncAfter(deadline: .now() + fakeDelay) {
            let updatedZone = self.updateZone(zoneId: zoneId) { (zone) -> Zone in
                var newZone = zone
                newZone.mode = mode
                return newZone
            }
            callback(.success(updatedZone))
        }
    }
    
    
    func updateFanMode(zoneId: String, fanMode: FanMode, callback: @escaping RemoteZoneUpdateCallback) {
        DispatchQueue.global().asyncAfter(deadline: .now() + fakeDelay) {
            let updatedZone = self.updateZone(zoneId: zoneId) { (zone) -> Zone in
                var newZone = zone
                newZone.fanMode = fanMode
                return newZone
            }
            callback(.success(updatedZone))
        }
    }
    
    func cancelTemperatureHold(zoneId: String, callback: @escaping RemoteZoneUpdateCallback) {
        DispatchQueue.global().asyncAfter(deadline: .now() + fakeDelay) {
            let updatedZone = self.updateZone(zoneId: zoneId) { (zone) -> Zone in
                var newZone = zone
                newZone.tempOverride = false
                return newZone
            }
            callback(.success(updatedZone))
        }
    }
    
    private func updateZone(zoneId: String, zoneUpdateBlock: ((Zone) -> Zone)) -> Zone {
        var updatedZone: Zone!
        locations = locations.map({ location in
            var newLocation = location
            newLocation.zones = newLocation.zones.map { zone in
                guard zone.id == zoneId else {
                    return zone
                }
                let newZone = zoneUpdateBlock(zone)
                updatedZone = newZone
                print("Updated zone with id: \(zoneId)")
                return newZone
            }
            return newLocation
        })
        return updatedZone
    }
    
    private func updateLocation(locationId: String, locationUpdateBlock: ((Location) -> Location)) -> Location {
        var updatedLocation: Location!
        self.locations = self.locations.map {
            guard $0.id == locationId else {
                return $0
            }
            
            updatedLocation = locationUpdateBlock($0)
            print("Updated location with id: \(locationId)")
            return updatedLocation
        }
        return updatedLocation
    }
}
