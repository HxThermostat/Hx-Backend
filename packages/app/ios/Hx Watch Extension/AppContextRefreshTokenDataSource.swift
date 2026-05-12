//
//  AppContextRefreshTokenDataSource.swift
//  Hx Watch Extension
//
//  Created by Nicky Leach on 7/22/20.
//

import Foundation
import WatchConnectivity

class AppContextRefreshTokenDataSource: NSObject, RefreshTokenDataSource {
  private let session = WCSession.default
  private var callback: ((Error?) -> Void)?
  
  func activate(callback: @escaping ((Error?) -> Void)) {
    self.callback = callback
    
    session.delegate = self
    session.activate()
  }

  var refreshToken: String? = nil
}

extension AppContextRefreshTokenDataSource: WCSessionDelegate {
  func session(_ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState, error: Error?) {
    refreshToken = session.applicationContext["refreshToken"] as? String
    callback?(error)
    callback = nil
  }
  
  func session(_ session: WCSession, didReceiveApplicationContext applicationContext: [String : Any]) {
    if let newRefreshToken = applicationContext["refreshToken"] as? String, newRefreshToken != "LOGOUT" {
      refreshToken = newRefreshToken
    } else {
      refreshToken = nil
    }
  }
}
