const { User, Player, Game } = require('../models');


const resolvers = {
  Query: {
    users: async () => {
      return User.find({})
    },
    user: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return User.find(params);
    },
    players: async () => {
      return Player.find({})
    },
    player: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Player.find(params);
    },
    games: async () => {
      return Game.find({})
    },
    game: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Game.find(params);
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      return user;
    },
    updateUser: async (parent, args) => {
      const user = await User.findByIdAndUpdate(
        args.id,
        args,
        { new: true }
      )
      return user
    },
    deleteUser: async (parent, args) => {
      const user = await User.findByIdAndDelete(args.id)
    },
    createPlayer: async (parent, args) => {
      const player = await Player.create(args);
      return player;
    },
    updatePlayer: async (parent, args) => {
      const player = await Player.findByIdAndUpdate(
        args.id,
        args,
        { new: true }
      )
      return player
    },
    createGame: async (parent, args) => {
      const game = await Game.create(args);
      return game;
    },
  },
};

module.exports = resolvers;
