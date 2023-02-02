const { gql } = require('apollo-server-express');

// NOTE: everything having to do with percents and damage has to be a float. youd never know it because it only shows real integers, but melee tracks a ton of sig figs
const typeDefs = gql`
  type Auth {
    token: ID!
    user: User
  }
  type Matchup {
    games: [Game]
  }
  type SettingsPlayer {
    playerIndex: Int
    port: Int
    characterId: Int
    characterColor: Int
    startStocks: Int
    type: Int
    teamId: Int
    controllerFix: String
    nametag: String
    displayName: String
    connectCode: String
    userId: String
  }

  type Settings {
    slpVersion: String
    isTeams: Boolean
    isPAL: Boolean
    stageId: Int
    players: [SettingsPlayer]
  }
  type MetadataName {
    netplay: String
    code: String
  }

  type MetadataPlayer {
    names: MetadataName
    characters: [Int]
  }

  type Metadata {
    startAt: String
    lastFrame: Int
    players: [MetadataPlayer]
    playedOn: String
  }

  type Stock {
    playerIndex: Int
    startFrame: Int
    endFrame: Int
    startPercent: Int
    endPercent: Float
    currentPercent: Float
    count: Int
    deathAnimation: Int
  }

  type Move {
    playerIndex: Int
    frame: Int
    moveId: Int
    hitCount: Int
    damage: Float
  }

  type Conversion {
    playerIndex: Int
    lastHitBy: Int
    startFrame: Int
    endFrame: Int
    startPercent: Float
    currentPercent: Float
    endPercent: Float
    moves: [Move]
    didKill: Boolean
    openingType: String
  }

  type Combo {
    playerIndex: Int
    startFrame: Int
    endFrame: Int
    startPercent: Float
    currentPercent: Float
    endPercent: Float
    moves: [Move]
    didKill: Boolean
    lastHitBy: Int
  }

  type LCancelCount {
    success: Int
    fail: Int
  }

  type AttackCount {
    jab1: Int
    jab2: Int
    jab3: Int
    jabm: Int
    dash: Int
    ftilt: Int
    utilt: Int
    dtilt: Int
    fsmash: Int
    usmash: Int
    dsmash: Int
    nair: Int
    fair: Int
    bair: Int
    uair: Int
    dair: Int
  }

  type GrabCount {
    succes: Int
    fail: Int
  }

  type ThrowCount {
    up: Int
    forward: Int
    back: Int
    down: Int
  }

  type GroundTechCount {
    away: Int
    in: Int
    neutral: Int
    fail: Int
  }

  type WallTechCount {
    success: Int
    fail: Int
  }

  type ActionCounts {
    playerIndex: Int
    wavedashCount: Int
    wavelandCount: Int
    spotDodgeCount: Int
    airDodgeCount: Int
    dashDanceCount: Int
    ledgegrabCount: Int
    rollCount: Int
    lCancelCount: LCancelCount
    attackCount: AttackCount
    grabCount: GrabCount
    throwCount: ThrowCount
    groundTechCount: GroundTechCount
    wallTechCount: WallTechCount
  }

  type RatioCount {
    count: Float
    total: Float
    ratio: Float
  }

  type InputCounts {
    buttons: Int
    triggers: Int
    cstick: Int
    joystick: Int
    total: Int
  }

  type OverallStats {
    playerIndex: Int
    inputCounts: InputCounts
    conversionCount: Int
    totalDamage: Float
    killCount: Int
    successfulConversions: RatioCount
    inputsPerMinute: RatioCount
    digitalInputsPerMinute: RatioCount
    openingsPerKill: RatioCount
    damagePerOpening: RatioCount
    neutralWinRatio: RatioCount
    counterHitRatio: RatioCount
    beneficialTradeRatio: RatioCount
  }

  type Stats {
    lastFrame: Int
    playableFrameCount: Int
    stocks: [Stock]
    conversions: [Conversion]
    combos: [Combo]
    actionCounts: [ActionCounts]
    overall: [OverallStats]
    gameComplete: Boolean
  }

  type Winner {
    playerIndex: Int
    position: Int
  }

  type Game {
    _id: ID!
    codeIds: [CodeId]
    displayNames: [DisplayName]
    settings: Settings
    metadata: Metadata
    stats: Stats
    winners: [Winner]
    createdAt: String!
  }

  type CodeId {
    _id: ID!
    appUser: String
    connectCode: String!
    userId: String!
    displayNames: [DisplayName]
    games: [Game]
    createdAt: String!
  }

  type DisplayName {
    _id: ID!
    displayName: String!
    codeIds: [CodeId]
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    codeIds: [CodeId]
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    users: [User]
    user(_id: ID!): User
    games: [Game]
    gameById(_id: ID!): Game
    displayNames: [DisplayName]
    displayNameByName(displayName: String!): DisplayName
    displayNameById(_id: ID!): DisplayName
    codeIds: [CodeId]
    codeIdByCode(connectCode: String!): CodeId
    codeIdById(_id: ID!): CodeId
    matchup(id1: ID!, id2: ID!): [Game] 
  }
  # type Query {
    # codeIds: [CodeId]
    # connectNames: [ConnectName]
    # game: Game
    # games: [Game]
    # metadatas: [Metadata]
    # playerInfos: [PlayerInfo]
    # users: [User]
    # user(_id:ID!): User
  # }
  type Mutation {
    login(
      email: String!, 
      password: String!
      ): Auth
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
  }
  # type Mutation {
    # createCodeId(connectCode: String! userId: String): CodeId
    # createConnectName(displayName: String!, connectCode:): ConnectName
    # deleteUser(_id: ID! email: String!, password: String!): User
    # updateUser(_id: ID!, email: String! username: String, password: String): User
    # createPlayer(slippiID: String!, slippiUsername: String!): Player
    # login(username: String!, password: String!): User
  # }
`;

module.exports = typeDefs;
