//
//  WKInterfaceController+Error.swift
//  Hx WatchKit Extension
//
//  Created by Max Meyers on 7/8/20.
//  Copyright © 2020 Max Meyers. All rights reserved.
//

import WatchKit

extension WKInterfaceController: UpdaterErrorDelegate {
    @objc func showUpdateError(_ updateError: Updater.UpdateError) {
        let errorContext = ErrorContext(title: updateError.message, action: nil)
        presentController(withName: "Error", context: errorContext)
    }
}
