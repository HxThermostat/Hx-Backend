//
//  TemperatureInterfaceController.swift
//  Hx WatchKit Extension
//
//  Created by Max Meyers on 6/26/20.
//  Copyright © 2020 Max Meyers. All rights reserved.
//

import Foundation
import WatchKit

class TemperatureInterfaceController: WKInterfaceController, WKCrownDelegate, UpdaterDelegate {
    var zone: Zone! {
        didSet {
            configureWithZone(zone)
        }
    }
    
    var location: Location!

    var currentTemperaturePicker: TemperaturePicker? = nil
    var updater: Updater!

    @IBOutlet var frameImage: WKInterfaceImage!
    @IBOutlet var modeLabel: WKInterfaceLabel!
    @IBOutlet var tempLabel: WKInterfaceLabel!
    @IBOutlet var tempGroup: WKInterfaceGroup!
    @IBOutlet var maxGroup: WKInterfaceGroup!
    @IBOutlet var cancelOverrideLabel: WKInterfaceLabel!
    
    override func awake(withContext context: Any?) {
        super.awake(withContext: context)
        
        guard
            let zoneInfo = context as? ZoneInfo,
            let zone = ZoneManager.shared.getZone(zoneId: zoneInfo.zoneId),
            let location = ZoneManager.shared.getLocation(locationId: zoneInfo.locationId) else {
                print("TemperatureInterfaceController requires a valid ZoneInfo as context")
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
        
        crownSequencer.delegate = self
        crownSequencer.focus()
  
        cancelOverrideLabel.setAttributedText(.cancelOverrideString)
        configureWithZone(zone)
        resetTemperaturePicker()
    }
    
    func crownDidRotate(_ crownSequencer: WKCrownSequencer?, rotationalDelta: Double) {
        guard var picker = currentTemperaturePicker else {
            return
        }
        
        picker.addRotation(rotationalDelta)
        currentTemperaturePicker = picker
        
        let temperature = picker.temperature
        
        switch zone.mode {
        case .cool:
            zone.setpoint.cool = temperature
            updater.update(.zoneUpdate(.setpoint(temperature, .cool)), withDelay: 1)
        case .heat, .emergency:
            zone.setpoint.heat = temperature
            updater.update(.zoneUpdate(.setpoint(temperature, .heat)), withDelay: 1)
        default:
            break
        }
        
        if location.programmable {
            zone.tempOverride = true
        }
    }
    
    @IBAction func cancelOverrideTapped(_ sender: Any) {
        guard zone.tempOverride else {
            return
        }
        
        zone.tempOverride = false
        updater.update(.zoneUpdate(.cancelTempOverride))
    }
    
    func updateZone(_ zone: Zone) {
        let oldSetpoint = self.zone.setpoint
        self.zone = zone

        if oldSetpoint != zone.setpoint {
            resetTemperaturePicker()
        }
    }
    
    private func configureWithZone(_ zone: Zone) {
        cancelOverrideLabel.setAlpha(zone.tempOverride ? 1 : 0)

        switch zone.mode {
        case .cool, .heat, .emergency:
            tempGroup.setHidden(false)
            maxGroup.setHidden(true)
        case .maxCool, .maxHeat:
            tempGroup.setHidden(true)
            maxGroup.setHidden(false)
        default:
            pop()
            return
        }
                
        switch zone.mode {
        case .cool, .maxCool:
            frameImage.setImageNamed("cool-frame")
            let cool = TemperatureUnitManager.shared.toDisplay(temperature: Double(zone.setpoint.cool))
            tempLabel.setText("\(cool)")
        case .heat, .maxHeat, .emergency:
            frameImage.setImageNamed("heat-frame")
            let heat = TemperatureUnitManager.shared.toDisplay(temperature: Double(zone.setpoint.heat))
            tempLabel.setText("\(heat)")
        case .auto, .off:
            pop()
            return
        }
        
        switch zone.mode {
        case .cool, .maxCool:
            modeLabel.setText(NSLocalizedString(
                "Temperature.ModeLabel.Cool",
                comment: "A label showing that the thermostat is in cool mode"
            ))
        case .heat, .maxHeat:
            modeLabel.setText(NSLocalizedString(
                "Temperature.ModeLabel.Heat",
                comment: "A label showing that the thermostat is in heat mode"
            ))
        case .emergency:
            modeLabel.setText(NSLocalizedString(
                "Temperature.ModeLabel.Emergency",
                comment: "A label showing that the thermostat is in emergency mode"
            ))
        default:
            break
        }
    }
    
    private func resetTemperaturePicker() {
        let temperature: Temperature
        let temperatureOptions: [Temperature]
        
        switch zone.mode {
        case .cool:
            temperature = zone.setpoint.cool
            temperatureOptions = zone.coolOptions
        case .heat, .emergency:
            temperature = zone.setpoint.heat
            temperatureOptions = zone.heatOptions
        default:
            return
        }

        currentTemperaturePicker = TemperaturePicker(
            pickerType: .single,
            temperatureOptions: temperatureOptions,
            startingTemperature: temperature
        )
    }
}
