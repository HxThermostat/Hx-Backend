//
//  ZoneInterfaceController.swift
//  Hx WatchKit Extension
//
//  Created by Max Meyers on 6/26/20.
//  Copyright © 2020 Max Meyers. All rights reserved.
//

import WatchKit
import Foundation

class AwayRowController: NSObject {
    @IBOutlet var titleLabel: WKInterfaceLabel!
    @IBOutlet var toggle: WKInterfaceSwitch!
    
    var toggleValueChanged: ((Bool) -> Void)? = nil
    
    @IBAction func handleToggledChanged(_ value: Bool) {
        toggleValueChanged?(value)
    }
}

class SettingsRowController: NSObject {
    @IBOutlet var image: WKInterfaceImage!
    @IBOutlet var label: WKInterfaceLabel!
}

class DisabledSettingsRowController: NSObject {
    @IBOutlet var image: WKInterfaceImage!
    @IBOutlet var label: WKInterfaceLabel!
}

class ZoneInterfaceController: WKInterfaceController {
    @IBOutlet var indoorLabel: WKInterfaceLabel!
    @IBOutlet var indoorTempLabel: WKInterfaceLabel!
    @IBOutlet var outdoorLabel: WKInterfaceLabel!
    @IBOutlet var outdoorTempLabel: WKInterfaceLabel!
    @IBOutlet var humidityLabel: WKInterfaceLabel!
    @IBOutlet var humidityPercentageLabel: WKInterfaceLabel!
    @IBOutlet var table: WKInterfaceTable!

    var zoneInfo: ZoneInfo!
    var zone: Zone! {
        didSet {
            table.setRowTypes(ZoneRow.allCases.map {
                switch $0 {
                case .temperature, .fan:
                    return zone.away || zone.mode == .off ? "DisabledSettings" : "Settings"
                case .mode:
                    return zone.away ? "DisabledSettings" : "Settings"
                case .away:
                    return location.awayConfigurable ? "Settings" : "Away"
                }
            })
            
            configureSettingsRows()
            updateValues()
        }
    }
    var location: Location!
    
    var updater: Updater!
    
    private enum ZoneRow: CaseIterable {
        case away
        case temperature
        case fan
        case mode
        
        var rowType: String {
            switch self {
            case .away:
                return "Away"
            case .temperature, .fan, .mode:
                return "Settings"
            }
        }
    }
    
    override func awake(withContext context: Any?) {
        super.awake(withContext: context)
        
        guard
            let zoneInfo = context as? ZoneInfo,
            let zone = ZoneManager.shared.getZone(zoneId: zoneInfo.zoneId),
            let location = ZoneManager.shared.getLocation(locationId: zoneInfo.locationId)
            else {
                print("ZoneInterfaceController requires a ZoneInfo as context")
                pop()
                return
        }
        
        self.zoneInfo = zoneInfo
        self.location = location
        self.zone = zone

        updater = Updater(zoneInfo: zoneInfo, delegate: self)

        setTitle(zone.name)
        indoorLabel.setText(
            NSLocalizedString("Zone.IndoorTemp.Caption",
                              comment: "Caption for a label showing the indoor temperature")
        )
        outdoorLabel.setText(
            NSLocalizedString("Zone.OutdoorTemp.Caption",
                              comment: "Caption for a label showing the outdoor temperature")
        )
        humidityLabel.setText(
            NSLocalizedString("Zone.Humidity.Caption",
                              comment: "Caption for a label showing the humidity")
        )
    }
    
    override func table(_ table: WKInterfaceTable, didSelectRowAt rowIndex: Int) {
        let row = ZoneRow.allCases[rowIndex]
        switch row {
        case .away:
            pushController(withName: "Away", context: zoneInfo)
        case .temperature:
            switch zone.mode {
            case .cool, .maxCool, .heat, .maxHeat, .emergency:
                pushController(withName: "Temperature", context: zoneInfo)
            case .auto:
                pushController(withName: "AutoTemperature", context: zoneInfo)
            case .off:
                print("Error: Tapped temperature when zone was in offline mode")
                break
            }
        case .fan:
            pushController(withName: "Fan", context: zoneInfo)
        case .mode:
            pushController(withName: "Mode", context: zoneInfo)
        }
    }
    
    private func updateValues() {
        if !location.awayConfigurable {
            let awayController = table.rowController(at: 0) as! AwayRowController
            awayController.titleLabel.setText(
                NSLocalizedString(
                    "Zone.Toggle.Away",
                    comment: "Title of a toggle that allows the user to change the whether they are away from the zone"
                )
            )
            awayController.toggle.setOn(zone.away)
            awayController.toggleValueChanged = { [weak self] value in
                guard let self = self else { return }
                self.zone.away = value
                self.updater.update(.zoneUpdate(.away(value)), withDelay: 1)
            }
        }
      
      let indoorText = zone.indoorTemp != nil ? "\(TemperatureUnitManager.shared.toDisplay(temperature: Double(zone.indoorTemp!)))" : "--"
      let outdoorText = zone.outdoorTemp != nil ? "\(TemperatureUnitManager.shared.toDisplay(temperature: Double(zone.outdoorTemp!)))" : "--"
      let humidityText = zone.humidity != nil ? "\(Int(zone.humidity! * 100))": "--"
      
      var fontSize = UIFont.systemFont(ofSize: 30)
      if TemperatureUnitManager.shared.temperatureUnit === UnitTemperature.celsius {
        switch WKInterfaceDevice.currentResolution() {
        case .Watch38mm:
          fontSize = UIFont.systemFont(ofSize: 18)
        default:
          fontSize = UIFont.systemFont(ofSize: 23)
        }
      }
      
      let labelAttributes = [NSAttributedString.Key.font: fontSize]
      
      indoorTempLabel.setAttributedText(NSAttributedString(string: indoorText, attributes: labelAttributes))
      outdoorTempLabel.setAttributedText(NSAttributedString(string: outdoorText, attributes: labelAttributes))
      humidityPercentageLabel.setAttributedText(NSAttributedString(string: humidityText, attributes: labelAttributes))
    }
    
    private func configureSettingsRows() {
        if location.awayConfigurable {
            let awayController = table.rowController(at: 0) as! SettingsRowController
            awayController.label.setText(
                NSLocalizedString(
                    "Zone.Row.Away",
                    comment: "Title of a button that allows the user to change whether they are away from the home/zone"
                )
            )
            awayController.image.setImageNamed("away")
        }
        
        let temperatureController = table.rowController(at: 1) as! SettingsRowController
        temperatureController.label.setText(
            NSLocalizedString(
                "Zone.Row.Temperature",
                comment: "Title of a button that allows the user to change the zone's temperature setpoint"
            )
        )
        temperatureController.image.setImageNamed("temperature")
        
        let fanController = table.rowController(at: 2) as! SettingsRowController
        fanController.label.setText(
            NSLocalizedString(
                "Zone.Row.Fan",
                comment: "Title of a button that allows the user to change the zone's fan settings"
            )
        )
        fanController.image.setImageNamed("fan")

        let modeController = table.rowController(at: 3) as! SettingsRowController
        modeController.label.setText(
            NSLocalizedString(
                "Zone.Row.Mode",
                comment: "Title of a button that allows the user to change the zone's mode"
            )
        )
        modeController.image.setImageNamed("mode")
    }
}

extension ZoneInterfaceController: UpdaterDelegate {
    func updateZone(_ zone: Zone) {
        self.zone = zone
    }
    
    func updateLocation(_ location: Location) {
        self.location = location
    }
}
