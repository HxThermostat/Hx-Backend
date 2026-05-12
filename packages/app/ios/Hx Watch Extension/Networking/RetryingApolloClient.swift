//
//  RetryingApolloClient.swift
//  Hx WatchKit Extension
//
//  Created by Max Meyers on 7/21/20.
//  Copyright © 2020 Max Meyers. All rights reserved.
//

import Apollo
import Foundation

class RetryingApolloClient {
    private let apolloClient: ApolloClient
    
    init(apolloClient: ApolloClient) {
        self.apolloClient = apolloClient
    }
    
    @discardableResult
    func fetch<Query: GraphQLQuery>(
        query: Query,
        cachePolicy: CachePolicy = .returnCacheDataElseFetch,
        contextIdentifier: UUID? = nil,
        queue: DispatchQueue = DispatchQueue.main,
        remainingRetries: Int = 3,
        resultHandler: GraphQLResultHandler<Query.Data>? = nil
    ) -> Cancellable {
        let cancellable = MutableCancellable()
        cancellable.cancellable = apolloClient.fetch(query: query, cachePolicy: cachePolicy, contextIdentifier: contextIdentifier, queue: queue) { (result) in
            switch result {
            case .success:
                resultHandler?(result)
            case .failure(let error):
                if !cancellable.isCanceled && remainingRetries > 0 {
                    cancellable.cancellable = self.fetch(
                        query: query,
                        cachePolicy: cachePolicy,
                        contextIdentifier: contextIdentifier,
                        queue: queue,
                        remainingRetries: remainingRetries - 1,
                        resultHandler: resultHandler
                    )
                } else {
                    resultHandler?(.failure(error))
                }
            }
        }
        return cancellable
    }
    
    @discardableResult
    func perform<Mutation>(
        mutation: Mutation,
        queue: DispatchQueue = DispatchQueue.main,
        remainingRetries: Int = 3,
        resultHandler: GraphQLResultHandler<Mutation.Data>? = nil
    ) -> Cancellable where Mutation : GraphQLMutation {
        let cancellable = MutableCancellable()
        cancellable.cancellable = apolloClient.perform(
            mutation: mutation,
            queue: queue
        ) { result in
            switch result {
            case .success:
                resultHandler?(result)
            case .failure(let error):
                if !cancellable.isCanceled && remainingRetries > 0 {
                    cancellable.cancellable = self.perform(
                        mutation: mutation,
                        queue: queue,
                        remainingRetries: remainingRetries - 1,
                        resultHandler: resultHandler
                    )
                } else {
                    resultHandler?(.failure(error))
                }
            }
        }
        return cancellable
    }
}

private class MutableCancellable: Cancellable {
    var isCanceled = false
    var cancellable: Cancellable?
    
    func cancel() {
        isCanceled = true
        cancellable?.cancel()
    }
}
