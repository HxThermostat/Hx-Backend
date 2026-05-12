//
//  TemperatureUnitManager.swift
//  Hx Watch Extension
//
//  Created by Eli Zibin on 2021-04-23.
//

import Foundation

class TemperatureUnitManager {
  static var shared = TemperatureUnitManager();
  
  var temperatureUnit = UnitTemperature.fahrenheit
  
  private init() { }
  
  func farenheitToCelsius(temperature: Double) -> Double {
    let input = Measurement(value: temperature, unit: UnitTemperature.fahrenheit)
    let output = input.converted(to: UnitTemperature.celsius)
    return output.value
  }
  
  func toDisplay(temperature: Double) -> String {
    if self.temperatureUnit === UnitTemperature.celsius {
      let celcius = farenheitToCelsius(temperature: temperature)
      let truncatedValue = String(format: "%.1f", celcius)
      return truncatedValue
    }
    return String(format: "%.0f", temperature)
  }
}
