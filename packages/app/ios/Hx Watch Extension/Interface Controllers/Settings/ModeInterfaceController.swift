//
//  ModeInterfaceController.swift
//  Hx WatchKit Extension
//
//  Created by Max Meyers on 7/2/20.
//  Copyright © 2020 Max Meyers. All rights reserved.
//

import Foundation
import WatchKit

class ModeRowController: NSObject {
    @IBOutlet var groupNameGroup: WKInterfaceGroup!
    @IBOutlet var groupNameLabel: WKInterfaceLabel!
    @IBOutlet var nameLabel: WKInterfaceLabel!
    @IBOutlet var checkImage: WKInterfaceImage!
}

class DisabledModeRowController: NSObject {
    @IBOutlet var groupNameGroup: WKInterfaceGroup!
    @IBOutlet var groupNameLabel: WKInterfaceLabel!
    @IBOutlet var nameLabel: WKInterfaceLabel!
}

class ModeInterfaceController: WKInterfaceController, UpdaterDelegate {
    var zone: Zone! {
        didSet {
            guard oldValue != nil else { return }
            
            if zone.modeOptions != oldValue.modeOptions || zone.mode != oldValue.mode {
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
                print("ModeInterfaceController requires a valid ZoneInfo as context")
                pop()
                return
        }
        
        self.zone = zone
        updater = Updater(zoneInfo: zoneInfo, delegate: self)

        setTitle(NSLocalizedString("Mode.Title", comment: "The title of the mode selection screen"))
        
        table.setRowTypes(rowTypes(for: zone))
        updateRows()
    }
    
    override func table(_ table: WKInterfaceTable, didSelectRowAt rowIndex: Int) {
        zone.mode = zone.sortedModeOptions[rowIndex]
        
        updater.update(.zoneUpdate(.mode(zone.mode)))
    }
    
    func updateZone(_ zone: Zone) {
        self.zone = zone
    }

    private func rowTypes(for zone: Zone) -> [String] {
        return zone.sortedModeOptions.map {
            zone.modeAvailable(checkMode: $0) ? "Mode" : "DisabledMode"
        }
    }
    
    private func updateRows() {
        var advancedGroupNameAdded = false
        for (index, option) in zone.sortedModeOptions.enumerated() {
          if (zone.modeAvailable(checkMode: option)) {
            let controller = table.rowController(at: index) as! ModeRowController
            controller.nameLabel.setText(option.name)
            controller.checkImage.setHidden(zone.mode != option)

            if option.isAdvanced && !advancedGroupNameAdded {
                controller.groupNameGroup.setHidden(false)
                controller.groupNameLabel.setText(NSLocalizedString(
                    "Mode.Advanced.SectionHeader",
                    comment: "A section header for the advanced modes"
                ))
                advancedGroupNameAdded = true
            } else {
                controller.groupNameGroup.setHidden(true)
            }
          } else {
            let controller = table.rowController(at: index) as! DisabledModeRowController
            controller.nameLabel.setText(option.name)

            if option.isAdvanced && !advancedGroupNameAdded {
                controller.groupNameGroup.setHidden(false)
                controller.groupNameLabel.setText(NSLocalizedString(
                    "Mode.Advanced.SectionHeader",
                    comment: "A section header for the advanced modes"
                ))
                advancedGroupNameAdded = true
            } else {
                controller.groupNameGroup.setHidden(true)
            }
          } 
        }
    }
}

fileprivate extension Mode {
    var name: String {
        switch self {
        case .auto:
            return NSLocalizedString(
                "Mode.Mode.Auto",
                comment: "A button that puts the thermostat into auto mode"
            )
        case .cool:
            return NSLocalizedString(
                "Mode.Mode.Cool",
                comment: "A button that puts the thermostat into cool mode"
            )
        case .heat:
            return NSLocalizedString(
                "Mode.Mode.Heat",
                comment: "A button that puts the thermostat into heat mode"
            )
        case .off:
            return NSLocalizedString(
                "Mode.Mode.Off",
                comment: "A button that puts the thermostat into off mode"
            )
        case .maxHeat:
            return NSLocalizedString(
                "Mode.Mode.MaxHeat",
                comment: "A button that puts the thermostat into max heat mode"
            )
        case .maxCool:
            return NSLocalizedString(
                "Mode.Mode.MaxCool",
                comment: "A button that puts the thermostat into max cool mode"
            )
        case .emergency:
            return NSLocalizedString(
                "Mode.Mode.Emergency",
                comment: "A button that puts the thermostat into emergency heat mode"
            )
        }
    }
}
