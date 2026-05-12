//
//  ApolloAuthenticationClient.swift
//  Hx WatchKit Extension
//
//  Created by Max Meyers on 7/16/20.
//  Copyright © 2020 Max Meyers. All rights reserved.
//

import Apollo
import Foundation
import HxGraph

class ApolloAuthenticationClient: AuthenticationClient {
    static var shared = ApolloAuthenticationClient()
    
    private lazy var apollo = RetryingApolloClient(
        apolloClient: ApolloClient(url: hxCloudUrl)
    )
    
    func refreshTokens(
        refreshToken: String,
        callback: @escaping (Result<AuthTokens, Error>) -> Void
    ) {
        apollo.perform(mutation: RefreshTokenMutation(refreshToken: refreshToken)) { result in
            switch result {
            case .success(let response):
                if response.data?.refreshToken.asTokenInvalid != nil {
                    callback(.failure(APIError.unauthenticated))
                    return
                }
                
                guard let success = response.data?.refreshToken.asRefreshTokenSuccess else {
                    callback(.failure(APIError.invalidData))
                    return
                }
                let authTokens = AuthTokens(
                    refreshToken: success.refreshToken,
                    accessToken: (token: success.accessToken, ttl: TimeInterval(success.ttl))
                )
                callback(.success(authTokens))
            case .failure(let error):
                print("Failed to refresh token: \(error.localizedDescription)")
                callback(.failure(error))
            }
        }
    }
}
