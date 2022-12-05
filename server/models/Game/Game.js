const { Schema, model } = require('mongoose');
const Metadata = require('./GameMetadata/GameMetadata')
const Settings = require('./GameSettings/GameSettings')
const Stats = require('./GameStats/GameStats')
const Winner = require('./GameWinner/GameWinner')
const dateFormat = require('../utils/dateFormat')

const gameSchema = new Schema({
    _id: Schema.Types.ObjectId,
    connectNames: [{ type: Schema.Types.ObjectId, ref: 'ConnectName' }],
    settings: Settings,
    metadata: Metadata,
    stats: Stats,
    // rollbackFrames: [],
    winners: [Winner],
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
}
)

const Game = model('Game', gameSchema)

module.exports = Game