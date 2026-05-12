//
//  ZoneOfflineInterfaceController.swift
//  Hx WatchKit Extension
//
//  Created by Max Meyers on 7/13/20.
//  Copyright © 2020 Max Meyers. All rights reserved.
//

import WatchKit

class ZoneOfflineInterfaceController: WKInterfaceController {
    @IBOutlet var titleLabel: WKInterfaceLabel!

    override func awake(withContext context: Any?) {
        super.awake(withContext: context)
        
        guard
            let zoneInfo = context as? ZoneInfo,
            let zone = ZoneManager.shared.getZone(zoneId: zoneInfo.zoneId)
            else {
                return
        }

        setTitle(zone.name)
        titleLabel.setText(NSLocalizedString(
            "ZoneOffline.Title",
            comment: "A label explaining that the selected thermostat is offline"
        ))
    }
}
