// @generated
//  This file was automatically generated and should not be edited.

import Apollo
import Foundation

public enum TemperatureUnit: RawRepresentable, Equatable, Hashable, CaseIterable, Apollo.JSONDecodable, Apollo.JSONEncodable {
  public typealias RawValue = String
  case f
  case c
  /// Auto generated constant for unknown enum values
  case __unknown(RawValue)

  public init?(rawValue: RawValue) {
    switch rawValue {
      case "F": self = .f
      case "C": self = .c
      default: self = .__unknown(rawValue)
    }
  }

  public var rawValue: RawValue {
    switch self {
      case .f: return "F"
      case .c: return "C"
      case .__unknown(let value): return value
    }
  }

  public static func == (lhs: TemperatureUnit, rhs: TemperatureUnit) -> Bool {
    switch (lhs, rhs) {
      case (.f, .f): return true
      case (.c, .c): return true
      case (.__unknown(let lhsValue), .__unknown(let rhsValue)): return lhsValue == rhsValue
      default: return false
    }
  }

  public static var allCases: [TemperatureUnit] {
    return [
      .f,
      .c,
    ]
  }
}

public enum Setpoint: RawRepresentable, Equatable, Hashable, CaseIterable, Apollo.JSONDecodable, Apollo.JSONEncodable {
  public typealias RawValue = String
  case heat
  case cool
  /// Auto generated constant for unknown enum values
  case __unknown(RawValue)

  public init?(rawValue: RawValue) {
    switch rawValue {
      case "HEAT": self = .heat
      case "COOL": self = .cool
      default: self = .__unknown(rawValue)
    }
  }

  public var rawValue: RawValue {
    switch self {
      case .heat: return "HEAT"
      case .cool: return "COOL"
      case .__unknown(let value): return value
    }
  }

  public static func == (lhs: Setpoint, rhs: Setpoint) -> Bool {
    switch (lhs, rhs) {
      case (.heat, .heat): return true
      case (.cool, .cool): return true
      case (.__unknown(let lhsValue), .__unknown(let rhsValue)): return lhsValue == rhsValue
      default: return false
    }
  }

  public static var allCases: [Setpoint] {
    return [
      .heat,
      .cool,
    ]
  }
}

public enum Mode: RawRepresentable, Equatable, Hashable, CaseIterable, Apollo.JSONDecodable, Apollo.JSONEncodable {
  public typealias RawValue = String
  case off
  case auto
  case heat
  case cool
  case eheat
  case maxheat
  case maxcool
  /// Auto generated constant for unknown enum values
  case __unknown(RawValue)

  public init?(rawValue: RawValue) {
    switch rawValue {
      case "OFF": self = .off
      case "AUTO": self = .auto
      case "HEAT": self = .heat
      case "COOL": self = .cool
      case "EHEAT": self = .eheat
      case "MAXHEAT": self = .maxheat
      case "MAXCOOL": self = .maxcool
      default: self = .__unknown(rawValue)
    }
  }

  public var rawValue: RawValue {
    switch self {
      case .off: return "OFF"
      case .auto: return "AUTO"
      case .heat: return "HEAT"
      case .cool: return "COOL"
      case .eheat: return "EHEAT"
      case .maxheat: return "MAXHEAT"
      case .maxcool: return "MAXCOOL"
      case .__unknown(let value): return value
    }
  }

  public static func == (lhs: Mode, rhs: Mode) -> Bool {
    switch (lhs, rhs) {
      case (.off, .off): return true
      case (.auto, .auto): return true
      case (.heat, .heat): return true
      case (.cool, .cool): return true
      case (.eheat, .eheat): return true
      case (.maxheat, .maxheat): return true
      case (.maxcool, .maxcool): return true
      case (.__unknown(let lhsValue), .__unknown(let rhsValue)): return lhsValue == rhsValue
      default: return false
    }
  }

  public static var allCases: [Mode] {
    return [
      .off,
      .auto,
      .heat,
      .cool,
      .eheat,
      .maxheat,
      .maxcool,
    ]
  }
}

public enum FanMode: RawRepresentable, Equatable, Hashable, CaseIterable, Apollo.JSONDecodable, Apollo.JSONEncodable {
  public typealias RawValue = String
  case auto
  case fifteen
  case thirty
  case fortyfive
  case always
  /// Auto generated constant for unknown enum values
  case __unknown(RawValue)

  public init?(rawValue: RawValue) {
    switch rawValue {
      case "AUTO": self = .auto
      case "FIFTEEN": self = .fifteen
      case "THIRTY": self = .thirty
      case "FORTYFIVE": self = .fortyfive
      case "ALWAYS": self = .always
      default: self = .__unknown(rawValue)
    }
  }

  public var rawValue: RawValue {
    switch self {
      case .auto: return "AUTO"
      case .fifteen: return "FIFTEEN"
      case .thirty: return "THIRTY"
      case .fortyfive: return "FORTYFIVE"
      case .always: return "ALWAYS"
      case .__unknown(let value): return value
    }
  }

  public static func == (lhs: FanMode, rhs: FanMode) -> Bool {
    switch (lhs, rhs) {
      case (.auto, .auto): return true
      case (.fifteen, .fifteen): return true
      case (.thirty, .thirty): return true
      case (.fortyfive, .fortyfive): return true
      case (.always, .always): return true
      case (.__unknown(let lhsValue), .__unknown(let rhsValue)): return lhsValue == rhsValue
      default: return false
    }
  }

  public static var allCases: [FanMode] {
    return [
      .auto,
      .fifteen,
      .thirty,
      .fortyfive,
      .always,
    ]
  }
}

public enum AccessLevel: RawRepresentable, Equatable, Hashable, CaseIterable, Apollo.JSONDecodable, Apollo.JSONEncodable {
  public typealias RawValue = String
  case owner
  case installer
  case diagnostic
  case status
  /// Auto generated constant for unknown enum values
  case __unknown(RawValue)

  public init?(rawValue: RawValue) {
    switch rawValue {
      case "OWNER": self = .owner
      case "INSTALLER": self = .installer
      case "DIAGNOSTIC": self = .diagnostic
      case "STATUS": self = .status
      default: self = .__unknown(rawValue)
    }
  }

  public var rawValue: RawValue {
    switch self {
      case .owner: return "OWNER"
      case .installer: return "INSTALLER"
      case .diagnostic: return "DIAGNOSTIC"
      case .status: return "STATUS"
      case .__unknown(let value): return value
    }
  }

  public static func == (lhs: AccessLevel, rhs: AccessLevel) -> Bool {
    switch (lhs, rhs) {
      case (.owner, .owner): return true
      case (.installer, .installer): return true
      case (.diagnostic, .diagnostic): return true
      case (.status, .status): return true
      case (.__unknown(let lhsValue), .__unknown(let rhsValue)): return lhsValue == rhsValue
      default: return false
    }
  }

  public static var allCases: [AccessLevel] {
    return [
      .owner,
      .installer,
      .diagnostic,
      .status,
    ]
  }
}

public enum ConnectionStatus: RawRepresentable, Equatable, Hashable, CaseIterable, Apollo.JSONDecodable, Apollo.JSONEncodable {
  public typealias RawValue = String
  case online
  case offline
  case initializing
  /// Auto generated constant for unknown enum values
  case __unknown(RawValue)

  public init?(rawValue: RawValue) {
    switch rawValue {
      case "ONLINE": self = .online
      case "OFFLINE": self = .offline
      case "INITIALIZING": self = .initializing
      default: self = .__unknown(rawValue)
    }
  }

  public var rawValue: RawValue {
    switch self {
      case .online: return "ONLINE"
      case .offline: return "OFFLINE"
      case .initializing: return "INITIALIZING"
      case .__unknown(let value): return value
    }
  }

  public static func == (lhs: ConnectionStatus, rhs: ConnectionStatus) -> Bool {
    switch (lhs, rhs) {
      case (.online, .online): return true
      case (.offline, .offline): return true
      case (.initializing, .initializing): return true
      case (.__unknown(let lhsValue), .__unknown(let rhsValue)): return lhsValue == rhsValue
      default: return false
    }
  }

  public static var allCases: [ConnectionStatus] {
    return [
      .online,
      .offline,
      .initializing,
    ]
  }
}

public enum Override: RawRepresentable, Equatable, Hashable, CaseIterable, Apollo.JSONDecodable, Apollo.JSONEncodable {
  public typealias RawValue = String
  case away
  case vacation
  /// Auto generated constant for unknown enum values
  case __unknown(RawValue)

  public init?(rawValue: RawValue) {
    switch rawValue {
      case "AWAY": self = .away
      case "VACATION": self = .vacation
      default: self = .__unknown(rawValue)
    }
  }

  public var rawValue: RawValue {
    switch self {
      case .away: return "AWAY"
      case .vacation: return "VACATION"
      case .__unknown(let value): return value
    }
  }

  public static func == (lhs: Override, rhs: Override) -> Bool {
    switch (lhs, rhs) {
      case (.away, .away): return true
      case (.vacation, .vacation): return true
      case (.__unknown(let lhsValue), .__unknown(let rhsValue)): return lhsValue == rhsValue
      default: return false
    }
  }

  public static var allCases: [Override] {
    return [
      .away,
      .vacation,
    ]
  }
}

public final class LocationsQuery: GraphQLQuery {
  /// The raw GraphQL definition of this operation.
  public let operationDefinition: String =
    """
    query Locations {
      me {
        __typename
        id
        temperatureUnit
      }
      locations {
        __typename
        ...LocationFragment
      }
    }
    """

  public let operationName: String = "Locations"

  public var queryDocument: String { return operationDefinition.appending("\n" + LocationFragment.fragmentDefinition).appending("\n" + ZoneFragment.fragmentDefinition) }

  public init() {
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes: [String] = ["Query"]

    public static var selections: [GraphQLSelection] {
      return [
        GraphQLField("me", type: .object(Me.selections)),
        GraphQLField("locations", type: .nonNull(.list(.nonNull(.object(Location.selections))))),
      ]
    }

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(me: Me? = nil, locations: [Location]) {
      self.init(unsafeResultMap: ["__typename": "Query", "me": me.flatMap { (value: Me) -> ResultMap in value.resultMap }, "locations": locations.map { (value: Location) -> ResultMap in value.resultMap }])
    }

    public var me: Me? {
      get {
        return (resultMap["me"] as? ResultMap).flatMap { Me(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "me")
      }
    }

    public var locations: [Location] {
      get {
        return (resultMap["locations"] as! [ResultMap]).map { (value: ResultMap) -> Location in Location(unsafeResultMap: value) }
      }
      set {
        resultMap.updateValue(newValue.map { (value: Location) -> ResultMap in value.resultMap }, forKey: "locations")
      }
    }

    public struct Me: GraphQLSelectionSet {
      public static let possibleTypes: [String] = ["User"]

      public static var selections: [GraphQLSelection] {
        return [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("id", type: .nonNull(.scalar(String.self))),
          GraphQLField("temperatureUnit", type: .nonNull(.scalar(TemperatureUnit.self))),
        ]
      }

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: String, temperatureUnit: TemperatureUnit) {
        self.init(unsafeResultMap: ["__typename": "User", "id": id, "temperatureUnit": temperatureUnit])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: String {
        get {
          return resultMap["id"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var temperatureUnit: TemperatureUnit {
        get {
          return resultMap["temperatureUnit"]! as! TemperatureUnit
        }
        set {
          resultMap.updateValue(newValue, forKey: "temperatureUnit")
        }
      }
    }

    public struct Location: GraphQLSelectionSet {
      public static let possibleTypes: [String] = ["Location"]

      public static var selections: [GraphQLSelection] {
        return [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLFragmentSpread(LocationFragment.self),
        ]
      }

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var locationFragment: LocationFragment {
          get {
            return LocationFragment(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }
}

public final class RefreshTokenMutation: GraphQLMutation {
  /// The raw GraphQL definition of this operation.
  public let operationDefinition: String =
    """
    mutation RefreshToken($refreshToken: String!) {
      refreshToken(input: {token: $refreshToken}) {
        __typename
        ... on RefreshTokenSuccess {
          accessToken
          refreshToken
          ttl
        }
        ... on TokenInvalid {
          message
        }
      }
    }
    """

  public let operationName: String = "RefreshToken"

  public var refreshToken: String

  public init(refreshToken: String) {
    self.refreshToken = refreshToken
  }

  public var variables: GraphQLMap? {
    return ["refreshToken": refreshToken]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes: [String] = ["Mutation"]

    public static var selections: [GraphQLSelection] {
      return [
        GraphQLField("refreshToken", arguments: ["input": ["token": GraphQLVariable("refreshToken")]], type: .nonNull(.object(RefreshToken.selections))),
      ]
    }

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(refreshToken: RefreshToken) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "refreshToken": refreshToken.resultMap])
    }

    public var refreshToken: RefreshToken {
      get {
        return RefreshToken(unsafeResultMap: resultMap["refreshToken"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "refreshToken")
      }
    }

    public struct RefreshToken: GraphQLSelectionSet {
      public static let possibleTypes: [String] = ["RefreshTokenSuccess", "TokenInvalid"]

      public static var selections: [GraphQLSelection] {
        return [
          GraphQLTypeCase(
            variants: ["RefreshTokenSuccess": AsRefreshTokenSuccess.selections, "TokenInvalid": AsTokenInvalid.selections],
            default: [
              GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            ]
          )
        ]
      }

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public static func makeRefreshTokenSuccess(accessToken: String, refreshToken: String, ttl: Int) -> RefreshToken {
        return RefreshToken(unsafeResultMap: ["__typename": "RefreshTokenSuccess", "accessToken": accessToken, "refreshToken": refreshToken, "ttl": ttl])
      }

      public static func makeTokenInvalid(message: String) -> RefreshToken {
        return RefreshToken(unsafeResultMap: ["__typename": "TokenInvalid", "message": message])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var asRefreshTokenSuccess: AsRefreshTokenSuccess? {
        get {
          if !AsRefreshTokenSuccess.possibleTypes.contains(__typename) { return nil }
          return AsRefreshTokenSuccess(unsafeResultMap: resultMap)
        }
        set {
          guard let newValue = newValue else { return }
          resultMap = newValue.resultMap
        }
      }

      public struct AsRefreshTokenSuccess: GraphQLSelectionSet {
        public static let possibleTypes: [String] = ["RefreshTokenSuccess"]

        public static var selections: [GraphQLSelection] {
          return [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLField("accessToken", type: .nonNull(.scalar(String.self))),
            GraphQLField("refreshToken", type: .nonNull(.scalar(String.self))),
            GraphQLField("ttl", type: .nonNull(.scalar(Int.self))),
          ]
        }

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(accessToken: String, refreshToken: String, ttl: Int) {
          self.init(unsafeResultMap: ["__typename": "RefreshTokenSuccess", "accessToken": accessToken, "refreshToken": refreshToken, "ttl": ttl])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var accessToken: String {
          get {
            return resultMap["accessToken"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "accessToken")
          }
        }

        public var refreshToken: String {
          get {
            return resultMap["refreshToken"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "refreshToken")
          }
        }

        public var ttl: Int {
          get {
            return resultMap["ttl"]! as! Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "ttl")
          }
        }
      }

      public var asTokenInvalid: AsTokenInvalid? {
        get {
          if !AsTokenInvalid.possibleTypes.contains(__typename) { return nil }
          return AsTokenInvalid(unsafeResultMap: resultMap)
        }
        set {
          guard let newValue = newValue else { return }
          resultMap = newValue.resultMap
        }
      }

      public struct AsTokenInvalid: GraphQLSelectionSet {
        public static let possibleTypes: [String] = ["TokenInvalid"]

        public static var selections: [GraphQLSelection] {
          return [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLField("message", type: .nonNull(.scalar(String.self))),
          ]
        }

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(message: String) {
          self.init(unsafeResultMap: ["__typename": "TokenInvalid", "message": message])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var message: String {
          get {
            return resultMap["message"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "message")
          }
        }
      }
    }
  }
}

public final class ChangeLocationAwayMutation: GraphQLMutation {
  /// The raw GraphQL definition of this operation.
  public let operationDefinition: String =
    """
    mutation ChangeLocationAway($locationId: ID!, $active: Boolean!) {
      changeLocationAway(input: {id: $locationId, active: $active}) {
        __typename
        ... on ChangeLocationAwaySuccess {
          location {
            __typename
            ...LocationFragment
          }
        }
      }
    }
    """

  public let operationName: String = "ChangeLocationAway"

  public var queryDocument: String { return operationDefinition.appending("\n" + LocationFragment.fragmentDefinition).appending("\n" + ZoneFragment.fragmentDefinition) }

  public var locationId: GraphQLID
  public var active: Bool

  public init(locationId: GraphQLID, active: Bool) {
    self.locationId = locationId
    self.active = active
  }

  public var variables: GraphQLMap? {
    return ["locationId": locationId, "active": active]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes: [String] = ["Mutation"]

    public static var selections: [GraphQLSelection] {
      return [
        GraphQLField("changeLocationAway", arguments: ["input": ["id": GraphQLVariable("locationId"), "active": GraphQLVariable("active")]], type: .nonNull(.object(ChangeLocationAway.selections))),
      ]
    }

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(changeLocationAway: ChangeLocationAway) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "changeLocationAway": changeLocationAway.resultMap])
    }

    public var changeLocationAway: ChangeLocationAway {
      get {
        return ChangeLocationAway(unsafeResultMap: resultMap["changeLocationAway"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "changeLocationAway")
      }
    }

    public struct ChangeLocationAway: GraphQLSelectionSet {
      public static let possibleTypes: [String] = ["ChangeLocationAwaySuccess", "NotFound"]

      public static var selections: [GraphQLSelection] {
        return [
          GraphQLTypeCase(
            variants: ["ChangeLocationAwaySuccess": AsChangeLocationAwaySuccess.selections],
            default: [
              GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            ]
          )
        ]
      }

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public static func makeNotFound() -> ChangeLocationAway {
        return ChangeLocationAway(unsafeResultMap: ["__typename": "NotFound"])
      }

      public static func makeChangeLocationAwaySuccess(location: AsChangeLocationAwaySuccess.Location) -> ChangeLocationAway {
        return ChangeLocationAway(unsafeResultMap: ["__typename": "ChangeLocationAwaySuccess", "location": location.resultMap])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var asChangeLocationAwaySuccess: AsChangeLocationAwaySuccess? {
        get {
          if !AsChangeLocationAwaySuccess.possibleTypes.contains(__typename) { return nil }
          return AsChangeLocationAwaySuccess(unsafeResultMap: resultMap)
        }
        set {
          guard let newValue = newValue else { return }
          resultMap = newValue.resultMap
        }
      }

      public struct AsChangeLocationAwaySuccess: GraphQLSelectionSet {
        public static let possibleTypes: [String] = ["ChangeLocationAwaySuccess"]

        public static var selections: [GraphQLSelection] {
          return [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLField("location", type: .nonNull(.object(Location.selections))),
          ]
        }

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(location: Location) {
          self.init(unsafeResultMap: ["__typename": "ChangeLocationAwaySuccess", "location": location.resultMap])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var location: Location {
          get {
            return Location(unsafeResultMap: resultMap["location"]! as! ResultMap)
          }
          set {
            resultMap.updateValue(newValue.resultMap, forKey: "location")
          }
        }

        public struct Location: GraphQLSelectionSet {
          public static let possibleTypes: [String] = ["Location"]

          public static var selections: [GraphQLSelection] {
            return [
              GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
              GraphQLFragmentSpread(LocationFragment.self),
            ]
          }

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var fragments: Fragments {
            get {
              return Fragments(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }

          public struct Fragments {
            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public var locationFragment: LocationFragment {
              get {
                return LocationFragment(unsafeResultMap: resultMap)
              }
              set {
                resultMap += newValue.resultMap
              }
            }
          }
        }
      }
    }
  }
}

public final class ChangeAwayMutation: GraphQLMutation {
  /// The raw GraphQL definition of this operation.
  public let operationDefinition: String =
    """
    mutation ChangeAway($controllerId: ID!, $active: Boolean!) {
      changeAway(input: {id: $controllerId, active: $active}) {
        __typename
        ... on ChangeAwaySuccess {
          controller {
            __typename
            ...ZoneFragment
          }
        }
      }
    }
    """

  public let operationName: String = "ChangeAway"

  public var queryDocument: String { return operationDefinition.appending("\n" + ZoneFragment.fragmentDefinition) }

  public var controllerId: GraphQLID
  public var active: Bool

  public init(controllerId: GraphQLID, active: Bool) {
    self.controllerId = controllerId
    self.active = active
  }

  public var variables: GraphQLMap? {
    return ["controllerId": controllerId, "active": active]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes: [String] = ["Mutation"]

    public static var selections: [GraphQLSelection] {
      return [
        GraphQLField("changeAway", arguments: ["input": ["id": GraphQLVariable("controllerId"), "active": GraphQLVariable("active")]], type: .nonNull(.object(ChangeAway.selections))),
      ]
    }

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(changeAway: ChangeAway) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "changeAway": changeAway.resultMap])
    }

    public var changeAway: ChangeAway {
      get {
        return ChangeAway(unsafeResultMap: resultMap["changeAway"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "changeAway")
      }
    }

    public struct ChangeAway: GraphQLSelectionSet {
      public static let possibleTypes: [String] = ["ChangeAwaySuccess", "NotFound"]

      public static var selections: [GraphQLSelection] {
        return [
          GraphQLTypeCase(
            variants: ["ChangeAwaySuccess": AsChangeAwaySuccess.selections],
            default: [
              GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            ]
          )
        ]
      }

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public static func makeNotFound() -> ChangeAway {
        return ChangeAway(unsafeResultMap: ["__typename": "NotFound"])
      }

      public static func makeChangeAwaySuccess(controller: AsChangeAwaySuccess.Controller) -> ChangeAway {
        return ChangeAway(unsafeResultMap: ["__typename": "ChangeAwaySuccess", "controller": controller.resultMap])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var asChangeAwaySuccess: AsChangeAwaySuccess? {
        get {
          if !AsChangeAwaySuccess.possibleTypes.contains(__typename) { return nil }
          return AsChangeAwaySuccess(unsafeResultMap: resultMap)
        }
        set {
          guard let newValue = newValue else { return }
          resultMap = newValue.resultMap
        }
      }

      public struct AsChangeAwaySuccess: GraphQLSelectionSet {
        public static let possibleTypes: [String] = ["ChangeAwaySuccess"]

        public static var selections: [GraphQLSelection] {
          return [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLField("controller", type: .nonNull(.object(Controller.selections))),
          ]
        }

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(controller: Controller) {
          self.init(unsafeResultMap: ["__typename": "ChangeAwaySuccess", "controller": controller.resultMap])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var controller: Controller {
          get {
            return Controller(unsafeResultMap: resultMap["controller"]! as! ResultMap)
          }
          set {
            resultMap.updateValue(newValue.resultMap, forKey: "controller")
          }
        }

        public struct Controller: GraphQLSelectionSet {
          public static let possibleTypes: [String] = ["Controller"]

          public static var selections: [GraphQLSelection] {
            return [
              GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
              GraphQLFragmentSpread(ZoneFragment.self),
            ]
          }

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var fragments: Fragments {
            get {
              return Fragments(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }

          public struct Fragments {
            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public var zoneFragment: ZoneFragment {
              get {
                return ZoneFragment(unsafeResultMap: resultMap)
              }
              set {
                resultMap += newValue.resultMap
              }
            }
          }
        }
      }
    }
  }
}

public final class ChangeSetpointMutation: GraphQLMutation {
  /// The raw GraphQL definition of this operation.
  public let operationDefinition: String =
    """
    mutation ChangeSetpoint($controllerId: ID!, $setpoint: Setpoint!, $value: Int!) {
      changeSetpoint(input: {id: $controllerId, setpoint: $setpoint, value: $value}) {
        __typename
        ... on ChangeSetpointSuccess {
          controller {
            __typename
            ...ZoneFragment
          }
        }
      }
    }
    """

  public let operationName: String = "ChangeSetpoint"

  public var queryDocument: String { return operationDefinition.appending("\n" + ZoneFragment.fragmentDefinition) }

  public var controllerId: GraphQLID
  public var setpoint: Setpoint
  public var value: Int

  public init(controllerId: GraphQLID, setpoint: Setpoint, value: Int) {
    self.controllerId = controllerId
    self.setpoint = setpoint
    self.value = value
  }

  public var variables: GraphQLMap? {
    return ["controllerId": controllerId, "setpoint": setpoint, "value": value]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes: [String] = ["Mutation"]

    public static var selections: [GraphQLSelection] {
      return [
        GraphQLField("changeSetpoint", arguments: ["input": ["id": GraphQLVariable("controllerId"), "setpoint": GraphQLVariable("setpoint"), "value": GraphQLVariable("value")]], type: .nonNull(.object(ChangeSetpoint.selections))),
      ]
    }

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(changeSetpoint: ChangeSetpoint) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "changeSetpoint": changeSetpoint.resultMap])
    }

    public var changeSetpoint: ChangeSetpoint {
      get {
        return ChangeSetpoint(unsafeResultMap: resultMap["changeSetpoint"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "changeSetpoint")
      }
    }

    public struct ChangeSetpoint: GraphQLSelectionSet {
      public static let possibleTypes: [String] = ["ChangeSetpointSuccess", "AwayModeActive", "VacationModeActive", "NotFound"]

      public static var selections: [GraphQLSelection] {
        return [
          GraphQLTypeCase(
            variants: ["ChangeSetpointSuccess": AsChangeSetpointSuccess.selections],
            default: [
              GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            ]
          )
        ]
      }

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public static func makeAwayModeActive() -> ChangeSetpoint {
        return ChangeSetpoint(unsafeResultMap: ["__typename": "AwayModeActive"])
      }

      public static func makeVacationModeActive() -> ChangeSetpoint {
        return ChangeSetpoint(unsafeResultMap: ["__typename": "VacationModeActive"])
      }

      public static func makeNotFound() -> ChangeSetpoint {
        return ChangeSetpoint(unsafeResultMap: ["__typename": "NotFound"])
      }

      public static func makeChangeSetpointSuccess(controller: AsChangeSetpointSuccess.Controller) -> ChangeSetpoint {
        return ChangeSetpoint(unsafeResultMap: ["__typename": "ChangeSetpointSuccess", "controller": controller.resultMap])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var asChangeSetpointSuccess: AsChangeSetpointSuccess? {
        get {
          if !AsChangeSetpointSuccess.possibleTypes.contains(__typename) { return nil }
          return AsChangeSetpointSuccess(unsafeResultMap: resultMap)
        }
        set {
          guard let newValue = newValue else { return }
          resultMap = newValue.resultMap
        }
      }

      public struct AsChangeSetpointSuccess: GraphQLSelectionSet {
        public static let possibleTypes: [String] = ["ChangeSetpointSuccess"]

        public static var selections: [GraphQLSelection] {
          return [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLField("controller", type: .nonNull(.object(Controller.selections))),
          ]
        }

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(controller: Controller) {
          self.init(unsafeResultMap: ["__typename": "ChangeSetpointSuccess", "controller": controller.resultMap])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var controller: Controller {
          get {
            return Controller(unsafeResultMap: resultMap["controller"]! as! ResultMap)
          }
          set {
            resultMap.updateValue(newValue.resultMap, forKey: "controller")
          }
        }

        public struct Controller: GraphQLSelectionSet {
          public static let possibleTypes: [String] = ["Controller"]

          public static var selections: [GraphQLSelection] {
            return [
              GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
              GraphQLFragmentSpread(ZoneFragment.self),
            ]
          }

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var fragments: Fragments {
            get {
              return Fragments(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }

          public struct Fragments {
            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public var zoneFragment: ZoneFragment {
              get {
                return ZoneFragment(unsafeResultMap: resultMap)
              }
              set {
                resultMap += newValue.resultMap
              }
            }
          }
        }
      }
    }
  }
}

public final class ChangeModeMutation: GraphQLMutation {
  /// The raw GraphQL definition of this operation.
  public let operationDefinition: String =
    """
    mutation ChangeMode($controllerId: ID!, $mode: Mode!) {
      changeMode(input: {id: $controllerId, mode: $mode}) {
        __typename
        ... on ChangeModeSuccess {
          controller {
            __typename
            ...ZoneFragment
          }
        }
      }
    }
    """

  public let operationName: String = "ChangeMode"

  public var queryDocument: String { return operationDefinition.appending("\n" + ZoneFragment.fragmentDefinition) }

  public var controllerId: GraphQLID
  public var mode: Mode

  public init(controllerId: GraphQLID, mode: Mode) {
    self.controllerId = controllerId
    self.mode = mode
  }

  public var variables: GraphQLMap? {
    return ["controllerId": controllerId, "mode": mode]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes: [String] = ["Mutation"]

    public static var selections: [GraphQLSelection] {
      return [
        GraphQLField("changeMode", arguments: ["input": ["id": GraphQLVariable("controllerId"), "mode": GraphQLVariable("mode")]], type: .nonNull(.object(ChangeMode.selections))),
      ]
    }

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(changeMode: ChangeMode) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "changeMode": changeMode.resultMap])
    }

    public var changeMode: ChangeMode {
      get {
        return ChangeMode(unsafeResultMap: resultMap["changeMode"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "changeMode")
      }
    }

    public struct ChangeMode: GraphQLSelectionSet {
      public static let possibleTypes: [String] = ["ChangeModeSuccess", "NotFound"]

      public static var selections: [GraphQLSelection] {
        return [
          GraphQLTypeCase(
            variants: ["ChangeModeSuccess": AsChangeModeSuccess.selections],
            default: [
              GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            ]
          )
        ]
      }

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public static func makeNotFound() -> ChangeMode {
        return ChangeMode(unsafeResultMap: ["__typename": "NotFound"])
      }

      public static func makeChangeModeSuccess(controller: AsChangeModeSuccess.Controller) -> ChangeMode {
        return ChangeMode(unsafeResultMap: ["__typename": "ChangeModeSuccess", "controller": controller.resultMap])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var asChangeModeSuccess: AsChangeModeSuccess? {
        get {
          if !AsChangeModeSuccess.possibleTypes.contains(__typename) { return nil }
          return AsChangeModeSuccess(unsafeResultMap: resultMap)
        }
        set {
          guard let newValue = newValue else { return }
          resultMap = newValue.resultMap
        }
      }

      public struct AsChangeModeSuccess: GraphQLSelectionSet {
        public static let possibleTypes: [String] = ["ChangeModeSuccess"]

        public static var selections: [GraphQLSelection] {
          return [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLField("controller", type: .nonNull(.object(Controller.selections))),
          ]
        }

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(controller: Controller) {
          self.init(unsafeResultMap: ["__typename": "ChangeModeSuccess", "controller": controller.resultMap])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var controller: Controller {
          get {
            return Controller(unsafeResultMap: resultMap["controller"]! as! ResultMap)
          }
          set {
            resultMap.updateValue(newValue.resultMap, forKey: "controller")
          }
        }

        public struct Controller: GraphQLSelectionSet {
          public static let possibleTypes: [String] = ["Controller"]

          public static var selections: [GraphQLSelection] {
            return [
              GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
              GraphQLFragmentSpread(ZoneFragment.self),
            ]
          }

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var fragments: Fragments {
            get {
              return Fragments(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }

          public struct Fragments {
            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public var zoneFragment: ZoneFragment {
              get {
                return ZoneFragment(unsafeResultMap: resultMap)
              }
              set {
                resultMap += newValue.resultMap
              }
            }
          }
        }
      }
    }
  }
}

public final class ChangeFanModeMutation: GraphQLMutation {
  /// The raw GraphQL definition of this operation.
  public let operationDefinition: String =
    """
    mutation ChangeFanMode($controllerId: ID!, $mode: FanMode!) {
      changeFanMode(input: {id: $controllerId, mode: $mode}) {
        __typename
        ... on ChangeFanModeSuccess {
          controller {
            __typename
            ...ZoneFragment
          }
        }
      }
    }
    """

  public let operationName: String = "ChangeFanMode"

  public var queryDocument: String { return operationDefinition.appending("\n" + ZoneFragment.fragmentDefinition) }

  public var controllerId: GraphQLID
  public var mode: FanMode

  public init(controllerId: GraphQLID, mode: FanMode) {
    self.controllerId = controllerId
    self.mode = mode
  }

  public var variables: GraphQLMap? {
    return ["controllerId": controllerId, "mode": mode]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes: [String] = ["Mutation"]

    public static var selections: [GraphQLSelection] {
      return [
        GraphQLField("changeFanMode", arguments: ["input": ["id": GraphQLVariable("controllerId"), "mode": GraphQLVariable("mode")]], type: .nonNull(.object(ChangeFanMode.selections))),
      ]
    }

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(changeFanMode: ChangeFanMode) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "changeFanMode": changeFanMode.resultMap])
    }

    public var changeFanMode: ChangeFanMode {
      get {
        return ChangeFanMode(unsafeResultMap: resultMap["changeFanMode"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "changeFanMode")
      }
    }

    public struct ChangeFanMode: GraphQLSelectionSet {
      public static let possibleTypes: [String] = ["ChangeFanModeSuccess", "NotFound", "NotSupported"]

      public static var selections: [GraphQLSelection] {
        return [
          GraphQLTypeCase(
            variants: ["ChangeFanModeSuccess": AsChangeFanModeSuccess.selections],
            default: [
              GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            ]
          )
        ]
      }

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public static func makeNotFound() -> ChangeFanMode {
        return ChangeFanMode(unsafeResultMap: ["__typename": "NotFound"])
      }

      public static func makeNotSupported() -> ChangeFanMode {
        return ChangeFanMode(unsafeResultMap: ["__typename": "NotSupported"])
      }

      public static func makeChangeFanModeSuccess(controller: AsChangeFanModeSuccess.Controller) -> ChangeFanMode {
        return ChangeFanMode(unsafeResultMap: ["__typename": "ChangeFanModeSuccess", "controller": controller.resultMap])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var asChangeFanModeSuccess: AsChangeFanModeSuccess? {
        get {
          if !AsChangeFanModeSuccess.possibleTypes.contains(__typename) { return nil }
          return AsChangeFanModeSuccess(unsafeResultMap: resultMap)
        }
        set {
          guard let newValue = newValue else { return }
          resultMap = newValue.resultMap
        }
      }

      public struct AsChangeFanModeSuccess: GraphQLSelectionSet {
        public static let possibleTypes: [String] = ["ChangeFanModeSuccess"]

        public static var selections: [GraphQLSelection] {
          return [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLField("controller", type: .nonNull(.object(Controller.selections))),
          ]
        }

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(controller: Controller) {
          self.init(unsafeResultMap: ["__typename": "ChangeFanModeSuccess", "controller": controller.resultMap])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var controller: Controller {
          get {
            return Controller(unsafeResultMap: resultMap["controller"]! as! ResultMap)
          }
          set {
            resultMap.updateValue(newValue.resultMap, forKey: "controller")
          }
        }

        public struct Controller: GraphQLSelectionSet {
          public static let possibleTypes: [String] = ["Controller"]

          public static var selections: [GraphQLSelection] {
            return [
              GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
              GraphQLFragmentSpread(ZoneFragment.self),
            ]
          }

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var fragments: Fragments {
            get {
              return Fragments(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }

          public struct Fragments {
            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public var zoneFragment: ZoneFragment {
              get {
                return ZoneFragment(unsafeResultMap: resultMap)
              }
              set {
                resultMap += newValue.resultMap
              }
            }
          }
        }
      }
    }
  }
}

public final class ChangeFanCfmMutation: GraphQLMutation {
  /// The raw GraphQL definition of this operation.
  public let operationDefinition: String =
    """
    mutation ChangeFanCFM($locationId: ID!, $cfm: Float!) {
      changeFanCfm(input: {id: $locationId, cfm: $cfm}) {
        __typename
        ... on ChangeFanCfmSuccess {
          location {
            __typename
            ...LocationFragment
          }
        }
      }
    }
    """

  public let operationName: String = "ChangeFanCFM"

  public var queryDocument: String { return operationDefinition.appending("\n" + LocationFragment.fragmentDefinition).appending("\n" + ZoneFragment.fragmentDefinition) }

  public var locationId: GraphQLID
  public var cfm: Double

  public init(locationId: GraphQLID, cfm: Double) {
    self.locationId = locationId
    self.cfm = cfm
  }

  public var variables: GraphQLMap? {
    return ["locationId": locationId, "cfm": cfm]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes: [String] = ["Mutation"]

    public static var selections: [GraphQLSelection] {
      return [
        GraphQLField("changeFanCfm", arguments: ["input": ["id": GraphQLVariable("locationId"), "cfm": GraphQLVariable("cfm")]], type: .nonNull(.object(ChangeFanCfm.selections))),
      ]
    }

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(changeFanCfm: ChangeFanCfm) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "changeFanCfm": changeFanCfm.resultMap])
    }

    public var changeFanCfm: ChangeFanCfm {
      get {
        return ChangeFanCfm(unsafeResultMap: resultMap["changeFanCfm"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "changeFanCfm")
      }
    }

    public struct ChangeFanCfm: GraphQLSelectionSet {
      public static let possibleTypes: [String] = ["ChangeFanCfmSuccess", "NotFound", "NotSupported"]

      public static var selections: [GraphQLSelection] {
        return [
          GraphQLTypeCase(
            variants: ["ChangeFanCfmSuccess": AsChangeFanCfmSuccess.selections],
            default: [
              GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            ]
          )
        ]
      }

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public static func makeNotFound() -> ChangeFanCfm {
        return ChangeFanCfm(unsafeResultMap: ["__typename": "NotFound"])
      }

      public static func makeNotSupported() -> ChangeFanCfm {
        return ChangeFanCfm(unsafeResultMap: ["__typename": "NotSupported"])
      }

      public static func makeChangeFanCfmSuccess(location: AsChangeFanCfmSuccess.Location) -> ChangeFanCfm {
        return ChangeFanCfm(unsafeResultMap: ["__typename": "ChangeFanCfmSuccess", "location": location.resultMap])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var asChangeFanCfmSuccess: AsChangeFanCfmSuccess? {
        get {
          if !AsChangeFanCfmSuccess.possibleTypes.contains(__typename) { return nil }
          return AsChangeFanCfmSuccess(unsafeResultMap: resultMap)
        }
        set {
          guard let newValue = newValue else { return }
          resultMap = newValue.resultMap
        }
      }

      public struct AsChangeFanCfmSuccess: GraphQLSelectionSet {
        public static let possibleTypes: [String] = ["ChangeFanCfmSuccess"]

        public static var selections: [GraphQLSelection] {
          return [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLField("location", type: .nonNull(.object(Location.selections))),
          ]
        }

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(location: Location) {
          self.init(unsafeResultMap: ["__typename": "ChangeFanCfmSuccess", "location": location.resultMap])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var location: Location {
          get {
            return Location(unsafeResultMap: resultMap["location"]! as! ResultMap)
          }
          set {
            resultMap.updateValue(newValue.resultMap, forKey: "location")
          }
        }

        public struct Location: GraphQLSelectionSet {
          public static let possibleTypes: [String] = ["Location"]

          public static var selections: [GraphQLSelection] {
            return [
              GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
              GraphQLFragmentSpread(LocationFragment.self),
            ]
          }

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var fragments: Fragments {
            get {
              return Fragments(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }

          public struct Fragments {
            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public var locationFragment: LocationFragment {
              get {
                return LocationFragment(unsafeResultMap: resultMap)
              }
              set {
                resultMap += newValue.resultMap
              }
            }
          }
        }
      }
    }
  }
}

public final class CancelTemperatureHoldMutation: GraphQLMutation {
  /// The raw GraphQL definition of this operation.
  public let operationDefinition: String =
    """
    mutation CancelTemperatureHold($controllerId: ID!) {
      cancelTemperatureHold(input: {id: $controllerId}) {
        __typename
        ... on CancelTemperatureHoldSuccess {
          controller {
            __typename
            ...ZoneFragment
          }
        }
      }
    }
    """

  public let operationName: String = "CancelTemperatureHold"

  public var queryDocument: String { return operationDefinition.appending("\n" + ZoneFragment.fragmentDefinition) }

  public var controllerId: GraphQLID

  public init(controllerId: GraphQLID) {
    self.controllerId = controllerId
  }

  public var variables: GraphQLMap? {
    return ["controllerId": controllerId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes: [String] = ["Mutation"]

    public static var selections: [GraphQLSelection] {
      return [
        GraphQLField("cancelTemperatureHold", arguments: ["input": ["id": GraphQLVariable("controllerId")]], type: .nonNull(.object(CancelTemperatureHold.selections))),
      ]
    }

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(cancelTemperatureHold: CancelTemperatureHold) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "cancelTemperatureHold": cancelTemperatureHold.resultMap])
    }

    public var cancelTemperatureHold: CancelTemperatureHold {
      get {
        return CancelTemperatureHold(unsafeResultMap: resultMap["cancelTemperatureHold"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "cancelTemperatureHold")
      }
    }

    public struct CancelTemperatureHold: GraphQLSelectionSet {
      public static let possibleTypes: [String] = ["CancelTemperatureHoldSuccess", "NotFound"]

      public static var selections: [GraphQLSelection] {
        return [
          GraphQLTypeCase(
            variants: ["CancelTemperatureHoldSuccess": AsCancelTemperatureHoldSuccess.selections],
            default: [
              GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            ]
          )
        ]
      }

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public static func makeNotFound() -> CancelTemperatureHold {
        return CancelTemperatureHold(unsafeResultMap: ["__typename": "NotFound"])
      }

      public static func makeCancelTemperatureHoldSuccess(controller: AsCancelTemperatureHoldSuccess.Controller) -> CancelTemperatureHold {
        return CancelTemperatureHold(unsafeResultMap: ["__typename": "CancelTemperatureHoldSuccess", "controller": controller.resultMap])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var asCancelTemperatureHoldSuccess: AsCancelTemperatureHoldSuccess? {
        get {
          if !AsCancelTemperatureHoldSuccess.possibleTypes.contains(__typename) { return nil }
          return AsCancelTemperatureHoldSuccess(unsafeResultMap: resultMap)
        }
        set {
          guard let newValue = newValue else { return }
          resultMap = newValue.resultMap
        }
      }

      public struct AsCancelTemperatureHoldSuccess: GraphQLSelectionSet {
        public static let possibleTypes: [String] = ["CancelTemperatureHoldSuccess"]

        public static var selections: [GraphQLSelection] {
          return [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLField("controller", type: .nonNull(.object(Controller.selections))),
          ]
        }

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(controller: Controller) {
          self.init(unsafeResultMap: ["__typename": "CancelTemperatureHoldSuccess", "controller": controller.resultMap])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var controller: Controller {
          get {
            return Controller(unsafeResultMap: resultMap["controller"]! as! ResultMap)
          }
          set {
            resultMap.updateValue(newValue.resultMap, forKey: "controller")
          }
        }

        public struct Controller: GraphQLSelectionSet {
          public static let possibleTypes: [String] = ["Controller"]

          public static var selections: [GraphQLSelection] {
            return [
              GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
              GraphQLFragmentSpread(ZoneFragment.self),
            ]
          }

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var fragments: Fragments {
            get {
              return Fragments(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }

          public struct Fragments {
            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public var zoneFragment: ZoneFragment {
              get {
                return ZoneFragment(unsafeResultMap: resultMap)
              }
              set {
                resultMap += newValue.resultMap
              }
            }
          }
        }
      }
    }
  }
}

public struct LocationFragment: GraphQLFragment {
  /// The raw GraphQL definition of this fragment.
  public static let fragmentDefinition: String =
    """
    fragment LocationFragment on Location {
      __typename
      id
      accessLevel
      name
      connectionStatus
      override
      programmable
      controllers {
        __typename
        ...ZoneFragment
      }
    }
    """

  public static let possibleTypes: [String] = ["Location"]

  public static var selections: [GraphQLSelection] {
    return [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
      GraphQLField("accessLevel", type: .nonNull(.scalar(AccessLevel.self))),
      GraphQLField("name", type: .nonNull(.scalar(String.self))),
      GraphQLField("connectionStatus", type: .nonNull(.scalar(ConnectionStatus.self))),
      GraphQLField("override", type: .scalar(Override.self)),
      GraphQLField("programmable", type: .scalar(Bool.self)),
      GraphQLField("controllers", type: .nonNull(.list(.nonNull(.object(Controller.selections))))),
    ]
  }

  public private(set) var resultMap: ResultMap

  public init(unsafeResultMap: ResultMap) {
    self.resultMap = unsafeResultMap
  }

  public init(id: GraphQLID, accessLevel: AccessLevel, name: String, connectionStatus: ConnectionStatus, `override`: Override? = nil, programmable: Bool? = nil, controllers: [Controller]) {
    self.init(unsafeResultMap: ["__typename": "Location", "id": id, "accessLevel": accessLevel, "name": name, "connectionStatus": connectionStatus, "override": `override`, "programmable": programmable, "controllers": controllers.map { (value: Controller) -> ResultMap in value.resultMap }])
  }

  public var __typename: String {
    get {
      return resultMap["__typename"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "__typename")
    }
  }

  public var id: GraphQLID {
    get {
      return resultMap["id"]! as! GraphQLID
    }
    set {
      resultMap.updateValue(newValue, forKey: "id")
    }
  }

  public var accessLevel: AccessLevel {
    get {
      return resultMap["accessLevel"]! as! AccessLevel
    }
    set {
      resultMap.updateValue(newValue, forKey: "accessLevel")
    }
  }

  public var name: String {
    get {
      return resultMap["name"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "name")
    }
  }

  public var connectionStatus: ConnectionStatus {
    get {
      return resultMap["connectionStatus"]! as! ConnectionStatus
    }
    set {
      resultMap.updateValue(newValue, forKey: "connectionStatus")
    }
  }

  public var `override`: Override? {
    get {
      return resultMap["override"] as? Override
    }
    set {
      resultMap.updateValue(newValue, forKey: "override")
    }
  }

  public var programmable: Bool? {
    get {
      return resultMap["programmable"] as? Bool
    }
    set {
      resultMap.updateValue(newValue, forKey: "programmable")
    }
  }

  public var controllers: [Controller] {
    get {
      return (resultMap["controllers"] as! [ResultMap]).map { (value: ResultMap) -> Controller in Controller(unsafeResultMap: value) }
    }
    set {
      resultMap.updateValue(newValue.map { (value: Controller) -> ResultMap in value.resultMap }, forKey: "controllers")
    }
  }

  public struct Controller: GraphQLSelectionSet {
    public static let possibleTypes: [String] = ["Controller"]

    public static var selections: [GraphQLSelection] {
      return [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(ZoneFragment.self),
      ]
    }

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var fragments: Fragments {
      get {
        return Fragments(unsafeResultMap: resultMap)
      }
      set {
        resultMap += newValue.resultMap
      }
    }

    public struct Fragments {
      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var zoneFragment: ZoneFragment {
        get {
          return ZoneFragment(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }
    }
  }
}

public struct ZoneFragment: GraphQLFragment {
  /// The raw GraphQL definition of this fragment.
  public static let fragmentDefinition: String =
    """
    fragment ZoneFragment on Controller {
      __typename
      id
      away {
        __typename
        active
      }
      disabled
      fan {
        __typename
        cfm
        override
        mode
        modes
      }
      humidity
      indoorTemp
      mode
      modes
      name
      deadband
      outdoorTemp
      setpoints {
        __typename
        heat
        cool
      }
      coolRange {
        __typename
        min
        max
      }
      heatRange {
        __typename
        min
        max
      }
      tempOverride
    }
    """

  public static let possibleTypes: [String] = ["Controller"]

  public static var selections: [GraphQLSelection] {
    return [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLField("id", type: .nonNull(.scalar(String.self))),
      GraphQLField("away", type: .object(Away.selections)),
      GraphQLField("disabled", type: .nonNull(.scalar(Bool.self))),
      GraphQLField("fan", type: .object(Fan.selections)),
      GraphQLField("humidity", type: .scalar(Double.self)),
      GraphQLField("indoorTemp", type: .scalar(Int.self)),
      GraphQLField("mode", type: .scalar(Mode.self)),
      GraphQLField("modes", type: .nonNull(.list(.nonNull(.scalar(Mode.self))))),
      GraphQLField("name", type: .nonNull(.scalar(String.self))),
      GraphQLField("deadband", type: .nonNull(.scalar(Int.self))),
      GraphQLField("outdoorTemp", type: .scalar(Int.self)),
      GraphQLField("setpoints", type: .object(Setpoint.selections)),
      GraphQLField("coolRange", type: .nonNull(.object(CoolRange.selections))),
      GraphQLField("heatRange", type: .nonNull(.object(HeatRange.selections))),
      GraphQLField("tempOverride", type: .scalar(Bool.self)),
    ]
  }

  public private(set) var resultMap: ResultMap

  public init(unsafeResultMap: ResultMap) {
    self.resultMap = unsafeResultMap
  }

  public init(id: String, away: Away? = nil, disabled: Bool, fan: Fan? = nil, humidity: Double? = nil, indoorTemp: Int? = nil, mode: Mode? = nil, modes: [Mode], name: String, deadband: Int, outdoorTemp: Int? = nil, setpoints: Setpoint? = nil, coolRange: CoolRange, heatRange: HeatRange, tempOverride: Bool? = nil) {
    self.init(unsafeResultMap: ["__typename": "Controller", "id": id, "away": away.flatMap { (value: Away) -> ResultMap in value.resultMap }, "disabled": disabled, "fan": fan.flatMap { (value: Fan) -> ResultMap in value.resultMap }, "humidity": humidity, "indoorTemp": indoorTemp, "mode": mode, "modes": modes, "name": name, "deadband": deadband, "outdoorTemp": outdoorTemp, "setpoints": setpoints.flatMap { (value: Setpoint) -> ResultMap in value.resultMap }, "coolRange": coolRange.resultMap, "heatRange": heatRange.resultMap, "tempOverride": tempOverride])
  }

  public var __typename: String {
    get {
      return resultMap["__typename"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "__typename")
    }
  }

  public var id: String {
    get {
      return resultMap["id"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "id")
    }
  }

  public var away: Away? {
    get {
      return (resultMap["away"] as? ResultMap).flatMap { Away(unsafeResultMap: $0) }
    }
    set {
      resultMap.updateValue(newValue?.resultMap, forKey: "away")
    }
  }

  public var disabled: Bool {
    get {
      return resultMap["disabled"]! as! Bool
    }
    set {
      resultMap.updateValue(newValue, forKey: "disabled")
    }
  }

  public var fan: Fan? {
    get {
      return (resultMap["fan"] as? ResultMap).flatMap { Fan(unsafeResultMap: $0) }
    }
    set {
      resultMap.updateValue(newValue?.resultMap, forKey: "fan")
    }
  }

  public var humidity: Double? {
    get {
      return resultMap["humidity"] as? Double
    }
    set {
      resultMap.updateValue(newValue, forKey: "humidity")
    }
  }

  public var indoorTemp: Int? {
    get {
      return resultMap["indoorTemp"] as? Int
    }
    set {
      resultMap.updateValue(newValue, forKey: "indoorTemp")
    }
  }

  public var mode: Mode? {
    get {
      return resultMap["mode"] as? Mode
    }
    set {
      resultMap.updateValue(newValue, forKey: "mode")
    }
  }

  public var modes: [Mode] {
    get {
      return resultMap["modes"]! as! [Mode]
    }
    set {
      resultMap.updateValue(newValue, forKey: "modes")
    }
  }

  public var name: String {
    get {
      return resultMap["name"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "name")
    }
  }

  public var deadband: Int {
    get {
      return resultMap["deadband"]! as! Int
    }
    set {
      resultMap.updateValue(newValue, forKey: "deadband")
    }
  }

  public var outdoorTemp: Int? {
    get {
      return resultMap["outdoorTemp"] as? Int
    }
    set {
      resultMap.updateValue(newValue, forKey: "outdoorTemp")
    }
  }

  public var setpoints: Setpoint? {
    get {
      return (resultMap["setpoints"] as? ResultMap).flatMap { Setpoint(unsafeResultMap: $0) }
    }
    set {
      resultMap.updateValue(newValue?.resultMap, forKey: "setpoints")
    }
  }

  public var coolRange: CoolRange {
    get {
      return CoolRange(unsafeResultMap: resultMap["coolRange"]! as! ResultMap)
    }
    set {
      resultMap.updateValue(newValue.resultMap, forKey: "coolRange")
    }
  }

  public var heatRange: HeatRange {
    get {
      return HeatRange(unsafeResultMap: resultMap["heatRange"]! as! ResultMap)
    }
    set {
      resultMap.updateValue(newValue.resultMap, forKey: "heatRange")
    }
  }

  public var tempOverride: Bool? {
    get {
      return resultMap["tempOverride"] as? Bool
    }
    set {
      resultMap.updateValue(newValue, forKey: "tempOverride")
    }
  }

  public struct Away: GraphQLSelectionSet {
    public static let possibleTypes: [String] = ["Away"]

    public static var selections: [GraphQLSelection] {
      return [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("active", type: .nonNull(.scalar(Bool.self))),
      ]
    }

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(active: Bool) {
      self.init(unsafeResultMap: ["__typename": "Away", "active": active])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var active: Bool {
      get {
        return resultMap["active"]! as! Bool
      }
      set {
        resultMap.updateValue(newValue, forKey: "active")
      }
    }
  }

  public struct Fan: GraphQLSelectionSet {
    public static let possibleTypes: [String] = ["Fan"]

    public static var selections: [GraphQLSelection] {
      return [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("cfm", type: .scalar(Double.self)),
        GraphQLField("override", type: .nonNull(.scalar(Bool.self))),
        GraphQLField("mode", type: .nonNull(.scalar(FanMode.self))),
        GraphQLField("modes", type: .nonNull(.list(.nonNull(.scalar(FanMode.self))))),
      ]
    }

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(cfm: Double? = nil, `override`: Bool, mode: FanMode, modes: [FanMode]) {
      self.init(unsafeResultMap: ["__typename": "Fan", "cfm": cfm, "override": `override`, "mode": mode, "modes": modes])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var cfm: Double? {
      get {
        return resultMap["cfm"] as? Double
      }
      set {
        resultMap.updateValue(newValue, forKey: "cfm")
      }
    }

    public var `override`: Bool {
      get {
        return resultMap["override"]! as! Bool
      }
      set {
        resultMap.updateValue(newValue, forKey: "override")
      }
    }

    public var mode: FanMode {
      get {
        return resultMap["mode"]! as! FanMode
      }
      set {
        resultMap.updateValue(newValue, forKey: "mode")
      }
    }

    public var modes: [FanMode] {
      get {
        return resultMap["modes"]! as! [FanMode]
      }
      set {
        resultMap.updateValue(newValue, forKey: "modes")
      }
    }
  }

  public struct Setpoint: GraphQLSelectionSet {
    public static let possibleTypes: [String] = ["Setpoints"]

    public static var selections: [GraphQLSelection] {
      return [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("heat", type: .nonNull(.scalar(Int.self))),
        GraphQLField("cool", type: .nonNull(.scalar(Int.self))),
      ]
    }

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(heat: Int, cool: Int) {
      self.init(unsafeResultMap: ["__typename": "Setpoints", "heat": heat, "cool": cool])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var heat: Int {
      get {
        return resultMap["heat"]! as! Int
      }
      set {
        resultMap.updateValue(newValue, forKey: "heat")
      }
    }

    public var cool: Int {
      get {
        return resultMap["cool"]! as! Int
      }
      set {
        resultMap.updateValue(newValue, forKey: "cool")
      }
    }
  }

  public struct CoolRange: GraphQLSelectionSet {
    public static let possibleTypes: [String] = ["SetpointRange"]

    public static var selections: [GraphQLSelection] {
      return [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("min", type: .nonNull(.scalar(Int.self))),
        GraphQLField("max", type: .nonNull(.scalar(Int.self))),
      ]
    }

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(min: Int, max: Int) {
      self.init(unsafeResultMap: ["__typename": "SetpointRange", "min": min, "max": max])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var min: Int {
      get {
        return resultMap["min"]! as! Int
      }
      set {
        resultMap.updateValue(newValue, forKey: "min")
      }
    }

    public var max: Int {
      get {
        return resultMap["max"]! as! Int
      }
      set {
        resultMap.updateValue(newValue, forKey: "max")
      }
    }
  }

  public struct HeatRange: GraphQLSelectionSet {
    public static let possibleTypes: [String] = ["SetpointRange"]

    public static var selections: [GraphQLSelection] {
      return [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("min", type: .nonNull(.scalar(Int.self))),
        GraphQLField("max", type: .nonNull(.scalar(Int.self))),
      ]
    }

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(min: Int, max: Int) {
      self.init(unsafeResultMap: ["__typename": "SetpointRange", "min": min, "max": max])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var min: Int {
      get {
        return resultMap["min"]! as! Int
      }
      set {
        resultMap.updateValue(newValue, forKey: "min")
      }
    }

    public var max: Int {
      get {
        return resultMap["max"]! as! Int
      }
      set {
        resultMap.updateValue(newValue, forKey: "max")
      }
    }
  }
}
