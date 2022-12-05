const { Schema, model } = require('mongoose');
const Move = require('./Move')
const conversionSchema = new Schema({
    playerIndex: {
        type: Number
    },
    lastHitBy: {
        type: Number
    },
    startFrame: {
        type: Number
    },
    endFrame: {
        type: Number
    },
    startPercent: {
        type: Number
    },
    currentPercent: {
        type: Number
    },
    endPercent: {
        type: Number
    },
    moves: [Move],
    didKill: {
        type: Boolean
    },
    openingType: {
        type: String
    }
})


module.exports = conversionSchema