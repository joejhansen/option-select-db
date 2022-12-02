const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    games: [Game]
  }
  type Player {
    _id: ID!
    slippiID: String
    slippiUsername: String
  }
  type Game {
    _id: ID!
    createdAt: String
    owner: ID!
    players: [Player]
# other stuff
  }
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(_id:ID!): User
    me: User
    users: [User]
    player: Player
    players: [Player]
    game: Game
    games: [Game]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    deleteUser(_id: ID! email: String!, password: String!): User
    updateUser(_id: ID!, email: String! username: String, password: String): User
    createPlayer(slippiID: String!, slippiUsername: String!): Player
    updatePlayer(_id: ID!, slippiUsername: String!): Player
    createGame(owner: ID! ): Game
    login(username: String!, password: String!): User
  }
`;

module.exports = typeDefs;
