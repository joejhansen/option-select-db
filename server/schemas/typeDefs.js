const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Auth {
    token: ID!
    user: User
  }
  type CodeId{
    _id: ID!
    connectCode: String!
    userId: User
    createdAt: String!
  }
  type ConnectNames {
    _id: ID!
    displayName: String!
    connectCode: String!
    userId: User
    createdAt: String!
  }
  type Game {
    _id: ID!
    connectNames: [ConnectName]
    slpVersion: String!
    isTeams: Boolean!
    isPal: Boolean!
    stageId: Int!
    scene: Int!
    gameMode: Int!
    language: Int!
    playerInfo: []
    metadata: [Metadata]
    createdAt: String!
# other stuff
  }
  type Metadata{
    _id: ID!
    createdAt: String!
  }
  type PlayerInfo {
    _id: ID!
    playerIndex: Int!
    port: Int!
    characterId: Int!
    characterColor: Int!
    startStocks: Int!
    type: Int!
    teamId: Int!
    controllerFix: String!
    nametag: String!
    connectName: ConnectName
    createdAt: String!
    updatedAt: String!
  }
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    codeIds: [CodeId]
    games: [Game]
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    codeIds: [CodeId]
    connectNames: [ConnectName]
    game: Game
    games: [Game]
    metadatas: [Metadata]
    playerInfos: [PlayerInfo]
    users: [User]
    user(_id:ID!): User
  }

  type Mutation {
    createCodeId(connectCode: String! userId: String): CodeId
    createConnectName(displayName: String!, connectCode:): ConnectName
    createGame: Game
    createMetadata: Metadata
    createPlayerInfo: PlayerInfo
    createUser(username: String!, email: String!, password: String!): User
    deleteUser(_id: ID! email: String!, password: String!): User
    updateUser(_id: ID!, email: String! username: String, password: String): User
    createPlayer(slippiID: String!, slippiUsername: String!): Player
    login(username: String!, password: String!): User
  }
`;

module.exports = typeDefs;
