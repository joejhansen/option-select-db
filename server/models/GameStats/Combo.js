const { Schema, model } = require('mongoose');
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
    // TODO: make moves model
    moves: {
        type: [
            Mixed
        ]
    },
    didKill: {
        type: Boolean
    },
    lastHitBy: {
        type: Number
    }
})


module.exports = comboSchema