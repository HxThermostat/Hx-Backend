//
//  AwayInterfaceController.swift
//  Hx WatchKit Extension
//
//  Created by Max Meyers on 7/2/20.
//  Copyright © 2020 Max Meyers. All rights reserved.
//

import WatchKit

class AwayInterfaceController: WKInterfaceController, UpdaterDelegate {
    var zone: Zone! {
        didSet {            
            zoneAwaySwitch.setOn(zone.away)
        }
    }
    var location: Location! {
        didSet {
            guard case .configurable(let isAway) = location.awayState else {
                return
            }
            homeAwaySwitch.setOn(isAway)
            zoneAwaySwitch.setEnabled(!isAway)
        }
    }
    
    var updater: Updater!
    var locationUpdater: Updater!
    
    @IBOutlet var homeAwaySwitch: WKInterfaceSwitch!
    @IBOutlet var zoneAwaySwitch: WKInterfaceSwitch!
    
    @IBAction func homeAwaySwitchValueChanged(_ value: Bool) {
        location.awayState = .configurable(value)
        zone.away = value
        
        updater.update(.locationUpdate(.away(value)))
    }
    
    @IBAction func zoneAwaySwitchValueChanged(_ value: Bool) {
        zone.away = value
        
        updater.update(.zoneUpdate(.away(value)))
    }
    
    override func awake(withContext context: Any?) {
        super.awake(withContext: context)
        
        guard
            let zoneInfo = context as? ZoneInfo,
            let zone = ZoneManager.shared.getZone(zoneId: zoneInfo.zoneId),
            let location = ZoneManager.shared.getLocation(locationId: zoneInfo.locationId),
            location.awayConfigurable
            else {
                print("AwayInterfaceController requires a valid ZoneInfo as context")
                pop()
                return
        }
        
        self.zone = zone
        self.location = location
        updater = Updater(zoneInfo: zoneInfo, delegate: self)
        
        setTitle(NSLocalizedString("Away.Title", comment: "The title of the away selection screen"))
        homeAwaySwitch.setTitle(NSLocalizedString(
            "Away.Home.Switch",
            comment: "A toggle that allows setting the home to away mode"
        ))
        zoneAwaySwitch.setTitle(NSLocalizedString(
            "Away.Zone.Switch",
            comment: "A toggle that allows setting the zone to away mode"
        ))
    }
    
    func updateZone(_ zone: Zone) {
        self.zone = zone
    }
    
    func updateLocation(_ location: Location) {
        self.location = location
    }
}
