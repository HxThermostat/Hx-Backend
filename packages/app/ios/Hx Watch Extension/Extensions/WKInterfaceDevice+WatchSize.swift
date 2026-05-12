//
//  WKInterfaceDevice+WatchSize.swift
//  Hx Watch Extension
//
//  Created by Eli Zibin on 2021-04-27.
//  https://stackoverflow.com/questions/29528792/how-to-tell-if-current-running-apple-watch-size-dimension-is-38mm-or-42mm

import Foundation

public enum WatchResolution {
  case Watch38mm, Watch40mm, Watch42mm, Watch44mm, Unknown
}

extension WKInterfaceDevice {
  
  class func currentResolution() -> WatchResolution {
    
    let watch38mmRect = CGRect(x: 0, y: 0, width: 136, height: 170)
    let watch40mmRect = CGRect(x: 0, y: 0, width: 162, height: 197)
    let watch42mmRect = CGRect(x: 0, y: 0, width: 156, height: 195)
    let watch44mmRect = CGRect(x: 0, y: 0, width: 184, height: 224)
    
    let currentBounds = WKInterfaceDevice.current().screenBounds
    
    switch currentBounds {
    case watch38mmRect:
      return .Watch38mm
    case watch40mmRect:
      return .Watch40mm
    case watch42mmRect:
      return .Watch42mm
    case watch44mmRect:
      return .Watch44mm
    default:
      return .Unknown
    }
  }
}
