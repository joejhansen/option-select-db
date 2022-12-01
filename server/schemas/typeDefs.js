const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!,
    password: String!,
  }
  type Player {
    _id: ID!
    slippiID: String!
    slippiUsername: String!,
  }
  type Game {
    _id: ID!

  }

  type Query {
    users: [User]
    players: [Player]
    games: [Game]
  }

  type Mutation {
    createUser(username: String!, password: String!): User
    updateUser(_id: String! username: String!, password: String!): User
    createPlayer(slippiID: String!, slippiUsername: String!): Player
    updatePlayer(slippiID: String!, slippiUsername: String!): Player
    createGame()
  }
`;

module.exports = typeDefs;
