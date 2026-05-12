//
//  AutoTemperatureInterfaceController.swift
//  Hx WatchKit Extension
//
//  Created by Max Meyers on 6/30/20.
//  Copyright © 2020 Max Meyers. All rights reserved.
//

import WatchKit

class AutoTemperatureInterfaceController: WKInterfaceController, WKCrownDelegate, UpdaterDelegate {
    var zone: Zone! {
        didSet {
          cancelOverrideLabel.setAlpha(zone.tempOverride ? 1 : 0)
          
          let lower = TemperatureUnitManager.shared.toDisplay(temperature: Double(zone.setpoint.heat))
          let upper = TemperatureUnitManager.shared.toDisplay(temperature: Double(zone.setpoint.cool))
          
          var labelAttributes: [NSAttributedString.Key: UIFont] = [:]
          
          if TemperatureUnitManager.shared.temperatureUnit === UnitTemperature.celsius {
            labelAttributes = getFontSizeForCelsius()
          }
          
          lowTempLabel.setAttributedText(NSAttributedString(string: "\(lower)º", attributes: labelAttributes))
          highTempLabel.setAttributedText(NSAttributedString(string: "\(upper)º", attributes: labelAttributes))
        }
    }
  
    func getFontSizeForCelsius() -> [NSAttributedString.Key : UIFont] {
      var fontSize: UIFont
      
      switch WKInterfaceDevice.currentResolution() {
      case .Watch38mm:
        fontSize = UIFont.systemFont(ofSize: 10.5)
      case .Watch40mm:
        fontSize = UIFont.systemFont(ofSize: 12.5)
      case .Watch42mm:
        fontSize = UIFont.systemFont(ofSize: 13.5)
      case .Watch44mm, .Unknown:
        fontSize = UIFont.systemFont(ofSize: 15)
      }
      
      return [NSAttributedString.Key.font: fontSize]
    }
  
    var location: Location!
    
    enum AutoTemperatureMode {
        case low
        case high
    }
    
    var autoMode: AutoTemperatureMode = .low
    var currentTemperaturePicker: TemperaturePicker? = nil
    var updater: Updater!

    @IBOutlet var modeLabel: WKInterfaceLabel!
    @IBOutlet var lowBorderGroup: WKInterfaceGroup!
    @IBOutlet var lowTempLabel: WKInterfaceLabel!
    @IBOutlet var highBorderGroup: WKInterfaceGroup!
    @IBOutlet var highTempLabel: WKInterfaceLabel!
    @IBOutlet var cancelOverrideLabel: WKInterfaceLabel!
    
    override func awake(withContext context: Any?) {
        super.awake(withContext: context)
        
        guard
            let zoneInfo = context as? ZoneInfo,
            let zone = ZoneManager.shared.getZone(zoneId: zoneInfo.zoneId),
            let location = ZoneManager.shared.getLocation(locationId: zoneInfo.locationId)
            else {
                print("AutoTemperatureInterfaceController requires a valid ZoneInfo as context")
                pop()
                return
        }
        
        self.zone = zone
        self.location = location
        updater = Updater(zoneInfo: zoneInfo, delegate: self)

        setTitle(NSLocalizedString(
            "Temperature.Title",
            comment: "The title of the temperature selection screen"
        ))
        modeLabel.setText(NSLocalizedString(
            "AutoTemperature.ModeLabel.Auto",
            comment: "A label showing that the thermostat is in auto mode"
        ))
        
        crownSequencer.delegate = self
        crownSequencer.focus()
  
        cancelOverrideLabel.setAttributedText(.cancelOverrideString)
        
        setAutoTemperaturePickerMode(.low)
    }
    
    func crownDidRotate(_ crownSequencer: WKCrownSequencer?, rotationalDelta: Double) {
        guard var picker = currentTemperaturePicker else {
            return
        }
        
        picker.addRotation(rotationalDelta)
        currentTemperaturePicker = picker
        
        let temperature = picker.temperature
        let setpointType: SetpointType
        switch picker.pickerType {
        case .low:
            zone.setpoint.heat = temperature
            setpointType = .heat
        case .high:
            zone.setpoint.cool = temperature
            setpointType = .cool
        default:
            fatalError("Invalid picker type \(picker.pickerType) for zone in auto mode")
        }
        
        updater.update(.zoneUpdate(.setpoint(temperature, setpointType)), withDelay: 1)
        if location.programmable {
            zone.tempOverride = true
        }
    }
    
    @IBAction func lowTemperatureGroupTapped(_ sender: Any) {
        setAutoTemperaturePickerMode(.low)
    }

    @IBAction func highTemperatureGroupTapped(_ sender: Any) {
        setAutoTemperaturePickerMode(.high)
    }
    
    @IBAction func cancelOverrideTapped(_ sender: Any) {
        guard zone.tempOverride else { return }
        
        zone.tempOverride = false
        updater.update(.zoneUpdate(.cancelTempOverride))
    }
    
    func updateZone(_ zone: Zone) {
        let oldSetpoint = self.zone.setpoint

        self.zone = zone
        
        if oldSetpoint != zone.setpoint {
            setAutoTemperaturePickerMode(autoMode)
        }
    }

    private func setAutoTemperaturePickerMode(_ autoMode: AutoTemperatureMode) {
        self.autoMode = autoMode
        
        let lowTemp = zone.setpoint.heat
        let highTemp = zone.setpoint.cool
        
        lowBorderGroup.setBackgroundColor(.defaultBorderColor)        
        highBorderGroup.setBackgroundColor(.defaultBorderColor)

        let picker: TemperaturePicker
        switch autoMode {
        case .low:
            let minimum = zone.heatOptions[0]
            let maximum = highTemp - zone.setpoint.minimumGap
            
            lowBorderGroup.setBackgroundColor(.highlightedBorderColor)
            picker = TemperaturePicker(
                pickerType: .low,
                temperatureOptions: Array(minimum...maximum),
                startingTemperature: lowTemp
            )
        case .high:
            let minimum = lowTemp + zone.setpoint.minimumGap
            let maximum = zone.coolOptions.last!
            
            highBorderGroup.setBackgroundColor(.highlightedBorderColor)
            picker = TemperaturePicker(
                pickerType: .high,
                temperatureOptions: Array(minimum...maximum),
                startingTemperature: highTemp
            )
        }
        currentTemperaturePicker = picker
    }
}

fileprivate extension UIColor {
    static let defaultBorderColor = UIColor(named: "temp-border-default")!
    static let highlightedBorderColor = UIColor(named: "temp-border-highlighted")!
}
