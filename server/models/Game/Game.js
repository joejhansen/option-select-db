const { Schema, model } = require('mongoose');
const Metadata = require('./GameMetadata/GameMetadata')
const Settings = require('./GameSettings/GameSettings')
const Stats = require('./GameStats/GameStats')
const Winner = require('./GameWinner/GameWinner')
const dateFormat = require('../../utils/dateFormat')

const gameSchema = new Schema({
    displayNames: [{ type: Schema.Types.ObjectId, ref: 'DisplayName' }],
    settings: {
        type: Settings,
        required: true,
    },
    metadata: {
        type: Metadata,
        required: true
    },
    stats: {
        type: Stats,
        required: true
    },
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