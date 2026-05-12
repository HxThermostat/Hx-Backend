//
//  RootInterfaceController.swift
//  Hx WatchKit Extension
//
//  Created by Max Meyers on 6/26/20.
//  Copyright © 2020 Max Meyers. All rights reserved.
//

import WatchKit
import Foundation

class RootInterfaceController: WKInterfaceController {
    @IBOutlet var activityImage: WKInterfaceImage!
    
    let activityIndicator = TTWKActivityIndicator(
        style: .default,
        color: UIColor(named: "kraftful-yellow"),
        bubbleRadius: 5
    )
    
    override func willActivate() {
        // This method is called when watch view controller is about to be visible to user
        super.willActivate()

        activityIndicator?.setToGroupOrImage(activityImage)
    }
    
    override func didDeactivate() {
        super.didDeactivate()
     
        activityImage.stopAnimating()
    }
}
