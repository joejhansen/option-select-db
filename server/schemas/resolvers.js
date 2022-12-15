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
      const games = await Game.find({}).populate(`displayNames`).populate(`codeIds`).select('-settings -stats')
      return games
    },
    gameById: async (parent, { _id }) => {

      const game = await Game.findById(_id).populate('displayNames').populate('codeIds')
      return game
    },
    displayNames: async () => {
      const displayNames = await DisplayName.find({}).populate({
        path: 'codeIds'
      })
      return displayNames
    },
    displayNameByName: async (parent, { displayName }) => {
      const displayNameByName = await DisplayName.findOne({ 'displayName': displayName }).populate('codeIds')
      return displayNameByName
    },
    displayNameById: async (parent, { _id }) => {
      const displayNameRegex = /^([ぁ-んァ-ンA-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]{1,15})$/
      // allows for Hiragana and Katakana as well as special characters
      let displayName
      if (_id.match(displayNameRegex)) {
        displayName = await DisplayName.findOne({ 'displayName': _id }).populate('codeIds')
      } else {
        displayName = await DisplayName.findById(_id).populate({
          path: 'codeIds'
        })
      }
      return displayName
    },
    codeIds: async () => {
      const codeIds = await CodeId.find({}).populate('displayNames').populate({path: 'games', select: '-stats -settings'})
      return codeIds
    },
    codeIdByCode: async (parent, { connectCode }) => {
      const codeId = await CodeId.findOne({ 'connectCode': connectCode }).populate('displayNames').populate({path: 'games', select: '-stats -settings'})
      return codeId
    },
    codeIdById: async (parent, { _id }) => {
      const codeRegex = /^(?=.{1,8}$)[A-Z]*\-\d*$/i
      let codeId
      if (_id.match(codeRegex)) {
        _id = _id.replace(/-/g, '#')
        codeId = await CodeId.findOne({ 'connectCode': _id }).populate('displayNames').populate({path: 'games', select: '-stats'})
      } else {
        codeId = await CodeId.findById(_id).populate('displayNames').populate({path: 'games', select: '-stats'})
      }
      return codeId
    },
    matchup: async (parent, { id1, id2 }) => {
      const codeRegex = /^([A-Z]{1,5})\-(\d{1,3})$/i
      let games
      if (id1.match(codeRegex) && id2.match(codeRegex)) {
        id1 = id1.replace(/-/g, '#')
        id2 = id2.replace(/-/g, '#')
        games = await Game.find({ 'settings.players.connectCode': { $all: [id1, id2] } }).populate('codeIds')
      } else {
        games = await Game.find({ codeIds: { $all: [id1, id2] } }).populate('codeIds')
      }
      return games
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
