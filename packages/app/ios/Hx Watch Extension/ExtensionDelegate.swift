//
//  ExtensionDelegate.swift
//  Hx WatchKit Extension
//
//  Created by Max Meyers on 6/26/20.
//  Copyright © 2020 Max Meyers. All rights reserved.
//

import WatchConnectivity
import WatchKit

class InMemoryRefreshTokenDataSource: RefreshTokenDataSource {
  init(refreshToken: String?) {
    self.refreshToken = refreshToken
  }
  
  func activate(callback: @escaping ((Error?) -> Void)) {
    callback(nil)
  }
  
  var refreshToken: String?
}

class ExtensionDelegate: NSObject, WKExtensionDelegate {
    private let refreshTokenDataSource = AppContextRefreshTokenDataSource()
    
    func applicationDidFinishLaunching() {
        let apiClient = getAPIClient()
        apiClient.authenticationDelegate = AppStateManager.shared
        
        AppStateManager.shared.refreshTokenDataSource = refreshTokenDataSource
      refreshTokenDataSource.activate { error in
        // TODO: Handle error
        AppStateManager.shared.start()
      }
    }

    func applicationDidBecomeActive() {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    }

    func applicationWillResignActive() {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, etc.
    }
}
