//
//  ErrorInterfaceController.swift
//  Hx WatchKit Extension
//
//  Created by Max Meyers on 7/21/20.
//  Copyright © 2020 Max Meyers. All rights reserved.
//

import Foundation
import WatchKit

struct ErrorContext {
    let title: String
    let action: (title: String, block: (() -> Void))?
}

class ErrorInterfaceController: WKInterfaceController {
    @IBOutlet var titleLabel: WKInterfaceLabel!
    @IBOutlet var actionButton: WKInterfaceButton!
    var actionBlock: (() -> Void)?
    
    override func awake(withContext context: Any?) {
        super.awake(withContext: context)
        
        guard let errorContext = context as? ErrorContext else {
            fatalError("ErrorInterfaceController requires an ErrorContext for its context")
        }
        
        titleLabel.setText(errorContext.title)
        
        if let action = errorContext.action {
            actionButton.setTitle(action.title)
            actionBlock = action.block
        } else {
            actionButton.setHidden(true)
        }
    }
    
    @IBAction func actionButtonPressed() {
        actionBlock?()
    }
}
