//
//  DispatchQueue+Extensions.swift
//  Hx WatchKit Extension
//
//  Created by Max Meyers on 7/16/20.
//  Copyright © 2020 Max Meyers. All rights reserved.
//

import Foundation

extension DispatchQueue {
    static func asyncMainIfNeeded(execute: @escaping () -> Void) {
        if Thread.current.isMainThread {
            execute()
        } else {
            DispatchQueue.main.async(execute: execute)
        }
    }
}
