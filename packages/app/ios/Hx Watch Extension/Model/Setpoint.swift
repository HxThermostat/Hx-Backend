//
//  Setpoint.swift
//  Hx WatchKit Extension
//
//  Created by Max Meyers on 7/8/20.
//  Copyright © 2020 Max Meyers. All rights reserved.
//

import Foundation

typealias Temperature = Int

enum SetpointType {
    case heat
    case cool
}

struct Setpoint: Equatable {
    var heat: Temperature
    var cool: Temperature
    let minimumGap: Int
}
