const { Schema, model } = require('mongoose');
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
    // TODO: make moves model
    moves: {
        type: [
            Mixed
        ]
    },
    didKill: {
        type: Boolean
    },
    openingType: {
        type: String
    }
})


module.exports = conversionSchema