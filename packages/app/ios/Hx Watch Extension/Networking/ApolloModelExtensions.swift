//
//  ApolloModelExtensions.swift
//  Hx WatchKit Extension
//
//  Created by Max Meyers on 7/16/20.
//  Copyright © 2020 Max Meyers. All rights reserved.
//

import Foundation
import HxGraph

extension Location {
    init?(locationFragment: HxGraph.LocationFragment) {
      guard let programmable = locationFragment.programmable else {
        return nil
      }

      if locationFragment.accessLevel != .owner {
        return nil
      }

      let zones = locationFragment.controllers.compactMap { Zone(zoneFragment: $0.fragments.zoneFragment) }
      let isAway = locationFragment.override == .some(.away)
        
      self = Location(
        id: locationFragment.id,
        name: locationFragment.name,
        online: locationFragment.connectionStatus == .some(.online),
        programmable: programmable,
        awayState: zones.count > 1 ? .configurable(isAway) : .notConfigurable,
        zones: zones
      )
    }
}

extension Zone {
    init?(zoneFragment: HxGraph.ZoneFragment) {
      guard let away = zoneFragment.away,
        let tempOverride = zoneFragment.tempOverride,
        let fan = zoneFragment.fan else {
        return nil
      }

      self = Zone(
            id: zoneFragment.id,
            name: zoneFragment.name,
            disabled: zoneFragment.disabled,
            away: away.active,
            setpoint: Setpoint(
              heat: zoneFragment.setpoints!.heat,
              cool: zoneFragment.setpoints!.cool,
                minimumGap: zoneFragment.deadband
            ),
            mode: Mode(graphMode: zoneFragment.mode!),
            modeOptions: zoneFragment.modes.map { return Mode(graphMode: $0) },
            indoorTemp: zoneFragment.indoorTemp,
            outdoorTemp: zoneFragment.outdoorTemp,
            humidity: zoneFragment.humidity,
            coolOptions: Array(zoneFragment.coolRange.min...zoneFragment.coolRange.max),
            heatOptions: Array(zoneFragment.heatRange.min...zoneFragment.heatRange.max),
            tempOverride: tempOverride,
            fanMode: FanMode(graphFanMode: zoneFragment.fan!.mode),
            fanModeOptions: fan.modes.map { FanMode(graphFanMode: $0) },
            airflow: fan.cfm != nil ?
              .configurable((fan.cfm!)) :
                .notConfigurable
        )
    }
}

extension Mode {
    init(graphMode: HxGraph.Mode) {
        switch graphMode {
        case .auto:
            self = .auto
        case .heat:
            self = .heat
        case .cool:
            self = .cool
        case .off:
            self = .off
        case .maxheat:
            self = .maxHeat
        case .maxcool:
            self = .maxCool
        case .eheat:
            self = .emergency
        case .__unknown(let rawValue):
            fatalError("Unknown mode: \(rawValue)")
        }
    }
    
    var graphMode: HxGraph.Mode {
        switch self {
        case .auto:
            return .auto
        case .heat:
            return .heat
        case .cool:
            return .cool
        case .off:
            return .off
        case .maxHeat:
            return .maxheat
        case .maxCool:
            return .maxcool
        case .emergency:
            return .eheat
        }
    }
}

extension FanMode {
    init(graphFanMode: HxGraph.FanMode) {
        switch graphFanMode {
        case .auto:
            self = .auto
        case .always:
            self = .always
        case .fifteen:
            self = .fifteenMinutes
        case .thirty:
            self = .thirtyMinutes
        case .fortyfive:
            self = .fortyfiveMinutes
        case .__unknown(let rawValue):
            fatalError("Unknown fan mode: \(rawValue)")
        }
    }
    
    var graphFanMode: HxGraph.FanMode {
        switch self {
        case .auto:
            return .auto
        case .always:
            return .always
        case .fifteenMinutes:
            return .fifteen
        case .thirtyMinutes:
            return .thirty
        case .fortyfiveMinutes:
            return .fortyfive
        }
    }
}

extension SetpointType {
    var graphSetpoint: HxGraph.Setpoint {
        switch self {
        case .cool:
            return .cool
        case .heat:
            return .heat
        }
    }
}
