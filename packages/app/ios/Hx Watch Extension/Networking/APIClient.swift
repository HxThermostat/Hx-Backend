//
//  APIClient.swift
//  Hx WatchKit Extension
//
//  Created by Max Meyers on 7/8/20.
//  Copyright © 2020 Max Meyers. All rights reserved.
//

import Foundation

typealias RemoteZoneUpdateCallback = (Result<Zone, Error>) -> Void
typealias RemoteHomeUpdateCallback = (Result<Location, Error>) -> Void

enum APIError: Error {
    case unauthenticated
    case invalidData
}

protocol Cancelable {
    func cancel()
}

protocol APIClient: class {
    var authenticationDelegate: APIClientAuthenticationDelegate? { get set }

    // Locations
    @discardableResult func getLocations(
        withCallback callback: @escaping (Result<[Location], Error>) -> Void
    ) -> Cancelable
    func updateLocationAway(
        locationId: String,
        isAway: Bool,
        callback: @escaping RemoteHomeUpdateCallback
    )
    func updateAirflow(
        locationId: String,
        airflow: Double,
        callback: @escaping RemoteHomeUpdateCallback
    )

    // Zones
    func updateZoneAway(zoneId: String, isAway: Bool, callback: @escaping RemoteZoneUpdateCallback)
    func updateSetpoint(
        zoneId: String,
        temperature: Temperature,
        setpointType: SetpointType,
        callback: @escaping RemoteZoneUpdateCallback
    )
    func updateMode(zoneId: String, mode: Mode, callback: @escaping RemoteZoneUpdateCallback)
    func updateFanMode(
        zoneId: String,
        fanMode: FanMode,
        callback: @escaping RemoteZoneUpdateCallback
    )
    func cancelTemperatureHold(zoneId: String, callback: @escaping RemoteZoneUpdateCallback)
}

protocol APIClientAuthenticationDelegate: class {
    func accessTokenForAPIClient(_ apiClient: APIClient) -> String?
    func requestFailedToAuthenticate()
}

func getAPIClient() -> APIClient {
    return ApolloAPIClient.shared
//    return FakeLocationManager.shared
}
