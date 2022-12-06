const { CodeId, DisplayName, Game, User, } = require('../models');


const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find({}).select('-password')
      return users
    },
    user: async (parent, { _id }) => {
      const user = await User.findById(_id).select('-password')
      return user
    },
    games: async () => {
      const games = await Game.find({}).populate({
        path: `displayNames`,
        populate: {
          path: 'codeIds'
        }
      })
      return games
    },
    game: async (parent, { _id }) => {
      const game = await Game.findById(_id).populate({
        path: `displayNames`,
        populate: {
          path: 'codeIds'
        }
      })
      return game
    },
    displayNames: async () => {
      const displayNames = await DisplayName.find({}).populate({
        path: 'codeIds'
      })
      return displayNames
    },
    displayName: async (parent, { _id }) => {
      const displayName = await DisplayName.findById(_id).populate({
        path: 'codeIds'
      })
      return displayName
    },
    codeIds: async () => {
      const codeIds = await CodeId.find({}).populate('displayNames').populate('games')
      return codeIds
    },
    codeId: async (parent, { _id }) => {
      const codeId = await CodeId.findById(_id).populate({
        path: 'displayNames'
      })
      return codeId
    }
  },
  Mutation: {
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
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(context.user.id, args, {
          new: true,
        });
      }

      throw new AuthenticationError('Not logged in');
    },
  },
};

module.exports = resolvers;
