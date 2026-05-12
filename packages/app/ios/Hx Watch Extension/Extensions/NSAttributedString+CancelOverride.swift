//
//  NSAttributedString+CancelOverride.swift
//  Hx WatchKit Extension
//
//  Created by Max Meyers on 6/30/20.
//  Copyright © 2020 Max Meyers. All rights reserved.
//

import Foundation
import UIKit

extension NSAttributedString {
    static let cancelOverrideString: NSAttributedString = {
        let string = NSLocalizedString(
            "Temperature.CancelOverrideButton",
            comment: "A button that cancels the schedule override on a thermostat"
        )
        let attributedString = NSMutableAttributedString(string: string)
        attributedString.setAttributes([
            .underlineStyle: NSUnderlineStyle.single.rawValue,
            .foregroundColor: UIColor.white.withAlphaComponent(0.74),
        ], range: NSRange(0..<string.count))
        return NSAttributedString(attributedString: attributedString)
    }()
}
