//
//  Zone.swift
//  Hx WatchKit Extension
//
//  Created by Max Meyers on 6/30/20.
//  Copyright © 2020 Max Meyers. All rights reserved.
//

import Foundation

struct Zone {
    let id: String
    let name: String

    let disabled: Bool
    
    var away: Bool
    var setpoint: Setpoint
    
    var mode: Mode
    let modeOptions: [Mode]
    
    let indoorTemp: Temperature?
    let outdoorTemp: Temperature?
    let humidity: Double?
    
    let coolOptions: [Temperature]
    let heatOptions: [Temperature]
    var tempOverride: Bool
    
    var fanMode: FanMode
    let fanModeOptions: [FanMode]
    var airflow: Airflow
    
    var sortedModeOptions: [Mode] {
        return modeOptions.sorted { (left, right) -> Bool in
            let allCases = Mode.allCases
            return allCases.firstIndex(of: left)! < allCases.firstIndex(of: right)!
        }
    }

    var sortedFanModeOptions: [FanMode] {
        return fanModeOptions.sorted { (left, right) -> Bool in
            if case .auto = left {
                return true;
            }

            let allCases = FanMode.allCases
            return allCases.firstIndex(of: left)! < allCases.firstIndex(of: right)!
        }
    }

    func modeAvailable(checkMode: Mode) -> Bool {
      switch checkMode {
      case .maxCool:
        return [.auto, .cool, .maxCool].contains(mode)
      case .maxHeat:
        return [.auto, .heat, .maxHeat].contains(mode)
      default:
        return true
      }
    }
}

extension Zone {
    static func example(
        id: String = UUID().uuidString,
        name: String = "Living Room",
        locationId: String = UUID().uuidString,
        setpoint: Setpoint = Setpoint(heat: 62, cool: 80, minimumGap: 3),
        mode: Mode = .auto,
        away: Bool
    ) -> Zone {
        return Zone(
            id: id,
            name: name,
            disabled: false,
            away: away,
            setpoint: setpoint,
            mode: mode,
            modeOptions: Mode.allCases,
            indoorTemp: 70,
            outdoorTemp: 60,
            humidity: 0.5,
            coolOptions: Array(60..<100),
            heatOptions: Array(60..<100),
            tempOverride: false,
            fanMode: .auto,
            fanModeOptions: FanMode.allCases,
            airflow: .configurable(0.3)
        )
    }
}
