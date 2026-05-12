//
//  Location.swift
//  Hx WatchKit Extension
//
//  Created by Max Meyers on 7/2/20.
//  Copyright © 2020 Max Meyers. All rights reserved.
//

import Foundation

struct Location {
    enum AwayState {
        case configurable(Bool)
        case notConfigurable
    }
    
    let id: String
    let name: String
    var online: Bool
    let programmable: Bool
    
    var awayState: AwayState
    var zones: [Zone]
    
    var awayConfigurable: Bool {
        switch awayState {
        case .configurable: return true
        case .notConfigurable: return false
        }
    }
}
