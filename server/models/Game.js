const { Schema, model } = require('mongoose');
const metadataSchema = require('./Metadata');
const playerInfoSchema = require('./PlayerInfo');
const example = {
    "slpVersion": "3.12.0",
    "isTeams": false,
    "isPAL": false,
    "stageId": 3,
    "scene": 2,
    "gameMode": 8,
    "language": 1
}
const gameSchema = new Schema({
    _id: Schema.Types.ObjectId,
    connectNames: [{ type: Schema.Types.ObjectId, ref: 'ConnectNames' }],
    slpVersion: {
        type: String,
        required: true,
        unique: false,
        trim: true,
    },
    isTeams: {
        type: Boolean,
        required: true,
        unique: false,
    },
    isPAL: {
        type: Boolean,
        required: true,
        unique: false,
    },
    stageId: {
        type: Number,
        required: true,
        unique: false,
    },
    scene: {
        type: Number,
        required: true,
        unique: false,
    },
    gameMode: {
        type: Number,
        required: true,
        unique: false,
    },
    language: {
        type: Number,
        required: true,
        unique: false,
    },
    playerInfo: [playerInfoSchema],
    metadata: [metadataSchema],
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
}
)

const Game = model('Game', gameSchema)

module.exports = Game