//
//  FanInterfaceController.swift
//  Hx WatchKit Extension
//
//  Created by Max Meyers on 6/30/20.
//  Copyright © 2020 Max Meyers. All rights reserved.
//

import WatchKit

class FanModeRowController: NSObject {
    @IBOutlet var nameLabel: WKInterfaceLabel!
    @IBOutlet var checkImage: WKInterfaceImage!
}

class AirflowRowController: NSObject {
    @IBOutlet var titleLabel: WKInterfaceLabel!
    @IBOutlet var slider: WKInterfaceSlider!
    @IBAction func sliderValueChanged(_ value: Float) {
        airflowValueChanged?(Double(value))
    }
    
    var airflowValueChanged: ((Double) -> Void)?
}

class FanInterfaceController: WKInterfaceController, UpdaterDelegate {
    var zone: Zone! {
        didSet {
            guard oldValue != nil else { return }
            
            if rowTypes(for: zone) != rowTypes(for: oldValue) {
                table.setRowTypes(rowTypes(for: zone))
            }
            
            updateRows()
        }
    }
    
    var updater: Updater!

    @IBOutlet var table: WKInterfaceTable!
    
    override func awake(withContext context: Any?) {
        super.awake(withContext: context)
        
        guard
            let zoneInfo = context as? ZoneInfo,
            let zone = ZoneManager.shared.getZone(zoneId: zoneInfo.zoneId)
            else {
                print("TemperatureInterfaceController requires a valid ZoneInfo as context")
                pop()
                return
        }
        
        self.zone = zone
        updater = Updater(zoneInfo: zoneInfo, delegate: self)
        
        setTitle(NSLocalizedString(
            "Fan.Title",
            comment: "The title of the fan mode selection screen"
        ))
        
        table.setRowTypes(rowTypes(for: zone))
        updateRows()
    }
    
    override func table(_ table: WKInterfaceTable, didSelectRowAt rowIndex: Int) {
        zone.fanMode = zone.sortedFanModeOptions[rowIndex]
        
        updater.update(.zoneUpdate(.fanMode(zone.fanMode)))
    }
    
    func updateZone(_ zone: Zone) {
        self.zone = zone
    }
    
    private func rowTypes(for zone: Zone) -> [String] {
        var names: [String] = []
        for _ in zone.sortedFanModeOptions {
            names.append("FanMode")
        }

        if case .configurable = zone.airflow, zone.fanMode != .auto {
            names.append("Airflow")
        }

        return names
    }
    
    private func updateRows() {
        zone.sortedFanModeOptions.enumerated().forEach { (index, option) in
            let controller = table.rowController(at: index) as! FanModeRowController
            controller.nameLabel.setText(option.name)
            controller.checkImage.setHidden(zone.fanMode != option)
        }

        if case .configurable(let airflow) = zone.airflow, zone.fanMode != .auto {
            let controller = table.rowController(at: zone.fanModeOptions.count) as! AirflowRowController
            controller.titleLabel.setText(NSLocalizedString(
                "Fan.Airflow.SectionHeader",
                comment: "A section header for controlling a thermostat's airflow level"
            ))
            controller.slider.setValue(Float(airflow))
            controller.airflowValueChanged = { [weak self] in
                self?.zone.airflow = .configurable($0)
                self?.updater.update(.locationUpdate(.airflow($0)), withDelay: 0.5)
            }
        }
    }
}

fileprivate extension FanMode {
    var name: String {
        switch self {
        case .auto:
            return NSLocalizedString(
                "Fan.Mode.Auto",
                comment: "The fan runs automatically"
            )
        case .always:
            return NSLocalizedString(
                "Fan.Mode.Always",
                comment: "The fan always runs"
            )
        case .fifteenMinutes:
            return NSLocalizedString(
                "Fan.Mode.Fifteen",
                comment: "The fan for 15 minutes every hour"
            )
        case .thirtyMinutes:
            return NSLocalizedString(
                "Fan.Mode.Thirty",
                comment: "The fan for 30 minutes every hour"
            )
        case .fortyfiveMinutes:
            return NSLocalizedString(
                "Fan.Mode.FortyFive",
                comment: "The fan for 45 minutes every hour"
            )
        }
    }
}
