//
//  MessageInterfaceController.swift
//  Hx WatchKit Extension
//
//  Created by Max Meyers on 7/2/20.
//  Copyright © 2020 Max Meyers. All rights reserved.
//

import WatchKit

class MessageInterfaceController: WKInterfaceController {

    @IBOutlet var messageLabel: WKInterfaceLabel!
    
    override func awake(withContext context: Any?) {
        super.awake(withContext: context)
        
        let message = (context as? String) ?? "---"
        messageLabel.setText(message)
    }
}
