const { Schema, model } = require('mongoose');
const Move = require('./Move')
const comboSchema = new Schema({
    playerIndex: {
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
    lastHitBy: {
        type: Number
    }
})


module.exports = comboSchema