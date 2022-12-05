const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
    _id: Schema.Types.ObjectId,
    connectNames: [{ type: Schema.Types.ObjectId, ref: 'ConnectNames' }],
    metadata: [],
    settings: [],
    stats: [],
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
}
)

const Game = model('Game', gameSchema)

module.exports = Game