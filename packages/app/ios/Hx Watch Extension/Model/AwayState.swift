//
//  AwayState.swift
//  Hx WatchKit Extension
//
//  Created by Max Meyers on 7/2/20.
//  Copyright © 2020 Max Meyers. All rights reserved.
//

import Foundation

struct AwayState {
    enum HomeAwayState {
        case configurable(Bool)
        case notConfigurable
    }
    
    var zoneAway: Bool
    var homeAway: HomeAwayState
    
    var homeAwayConfigurable: Bool {
        switch homeAway {
        case .configurable: return true
        case .notConfigurable: return false
        }
    }
}
