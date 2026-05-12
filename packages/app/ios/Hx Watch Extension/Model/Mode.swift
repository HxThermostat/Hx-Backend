//
//  Mode.swift
//  Hx WatchKit Extension
//
//  Created by Max Meyers on 7/2/20.
//  Copyright © 2020 Max Meyers. All rights reserved.
//

import Foundation

enum Mode: CaseIterable {
    case auto
    case heat
    case cool
    case off
    case maxHeat
    case maxCool
    case emergency
    
    var isAdvanced: Bool {
        switch self {
        case .auto, .cool, .heat, .off:
            return false
        case .maxHeat, .maxCool, .emergency:
            return true
        }
    }
}
