//
//  ZoneListInterfaceController.swift
//  Hx WatchKit Extension
//
//  Created by Max Meyers on 7/2/20.
//  Copyright © 2020 Max Meyers. All rights reserved.
//

import WatchKit
import Foundation

class ZoneRowController: NSObject {
    @IBOutlet var groupNameGroup: WKInterfaceGroup!
    @IBOutlet var groupNameLabel: WKInterfaceLabel!
    @IBOutlet var nameLabel: WKInterfaceLabel!
}

class ZoneListInterfaceController: WKInterfaceController {
    struct Row: Equatable {
        let rowType: String
        let zoneData: (zone: Zone, location: Location)?
        let header: String?
        
        static func == (lhs: ZoneListInterfaceController.Row, rhs: ZoneListInterfaceController.Row) -> Bool {
            return
                lhs.rowType == rhs.rowType &&
                    lhs.zoneData?.zone.name == rhs.zoneData?.zone.name &&
                    lhs.header == rhs.header
        }
    }
        
    var locations: [Location] = [] {
        didSet {
            updateRows()
        }
    }
    
    var rows: [Row] = [] {
        didSet {
            guard rows != oldValue else { return }
            
            table.setRowTypes(rows.map { $0.rowType })
            
            rows.enumerated().forEach { index, row in
                if let zone = row.zoneData?.zone {
                    let controller = table.rowController(at: index) as! ZoneRowController
                    controller.nameLabel.setText(zone.name)
                    controller.groupNameLabel.setText(row.header)
                    controller.groupNameGroup.setHidden(row.header == nil)
                }
            }
        }
    }
    
    @IBOutlet var table: WKInterfaceTable!

    override func awake(withContext context: Any?) {
        super.awake(withContext: context)
        
        guard let locations = context as? [Location] else {
            print("ZoneListInterfaceController must have a [Location] as context")
            pop()
            return
        }
        
        self.locations = locations
        
        ZoneManager.shared.subscribeToLocations(locationsUpdatable: self)
        
        setTitle(NSLocalizedString("ZoneList.Title", comment: "The title of the zone list screen"))
    }
    
    override func table(_ table: WKInterfaceTable, didSelectRowAt rowIndex: Int) {
        let zoneData = rows[rowIndex].zoneData!
        let zoneInfo = ZoneInfo(zoneId: zoneData.zone.id, locationId: zoneData.location.id)
        
        pushController(
            withName: zoneData.zone.disabled ? "ZoneOffline" : "Zone",
            context: zoneInfo
        )
    }
    
    private func updateRows() {
        rows = locations.enumerated().flatMap { (value) -> [Row] in
            var locationRows: [Row] = value.element.zones.enumerated().map { index, zone in
                return Row(
                    rowType: "Zone",
                    zoneData: (zone, value.element),
                    header: index == 0 ? value.element.name : nil
                )
            }
            if value.offset < locations.count - 1 {
                locationRows.append(Row(rowType: "Spacer", zoneData: nil, header: nil))
            }
            return locationRows
        }
    }
}

extension ZoneListInterfaceController: LocationsUpdatable {
    func locationsUpdated(_ locations: [Location]) {
        self.locations = locations
    }
}
