//
//  AuthenticationClient.swift
//  Hx WatchKit Extension
//
//  Created by Max Meyers on 7/16/20.
//  Copyright © 2020 Max Meyers. All rights reserved.
//

import Foundation

typealias AccessToken = (token: String, ttl: TimeInterval)

struct AuthTokens {
    let refreshToken: String
    let accessToken: AccessToken
}

protocol AuthenticationClient: class {
    func refreshTokens(refreshToken: String, callback: @escaping (Result<AuthTokens, Error>) -> Void)
}

func getAuthenticationClient() -> AuthenticationClient {
    return ApolloAuthenticationClient.shared
}
