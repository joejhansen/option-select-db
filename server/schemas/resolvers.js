const { User, Player, Game } = require('../models');


const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      return await User.findById(context.user._id).select('-password')

    },
    users: async () => {
      const users = await User.find({}).select('-password')
      return users
    },
    user: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      const user = await User.find(params).select('-password');
      return user
    },
    players: async () => {
      const players = await Player.find({})
      return players
    },
    player: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      const player = await Player.findById(params);
      return player
    },
    games: async () => {
      const games = await Game.find({})
      return games
    },
    game: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      const game = await Game.find(params);
      return game
    },
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password })
      return user;
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args) => {
      const user = await User.findByIdAndUpdate(
        args.id,
        args,
        { new: true }
      ).select('-password');
      return user
    },
    deleteUser: async (parent, args) => {
      const user = await User.findByIdAndDelete(args.id).select('-password');
      return user
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
