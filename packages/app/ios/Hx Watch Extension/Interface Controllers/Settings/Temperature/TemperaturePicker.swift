//
//  TemperaturePicker.swift
//  Hx WatchKit Extension
//
//  Created by Max Meyers on 6/30/20.
//  Copyright © 2020 Max Meyers. All rights reserved.
//

import Foundation

struct TemperaturePicker {
    enum PickerType {
        case single
        case low
        case high
    }
    var pickerType: PickerType
    
    static let degreesPerFullRotation = 10
    
    private var currentRotation: Double = 0
    private var startingIndex: Int

    private let temperatureOptions: [Temperature]
    private var temperatureIndex: Int
    
    init(
        pickerType: PickerType,
        temperatureOptions: [Temperature],
        startingTemperature: Temperature
    ) {
        self.pickerType = pickerType
        self.temperatureOptions = temperatureOptions

        startingIndex = temperatureOptions.firstIndex(of: startingTemperature)!
        temperatureIndex = startingIndex
    }
    
    var temperature: Temperature {
        return temperatureOptions[temperatureIndex]
    }
    
    mutating func addRotation(_ rotationalDelta: Double) {
        let newTotalRotation = currentRotation + rotationalDelta

        let newIndex = startingIndex + Int(newTotalRotation * Double(Self.degreesPerFullRotation))
        
        if newIndex >= 0 && newIndex < temperatureOptions.count {
            currentRotation = newTotalRotation
            temperatureIndex = newIndex
        }
    }
}
