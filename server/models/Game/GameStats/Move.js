const { Schema, model } = require('mongoose');

const movesSchema = new Schema({
    playerIndex: {
        type: Number
    },
    frame: {
        type: Number
    },
    moveId: {
        type: Number
    },
    hitCount: {
        type: Number
    },
    damage: {
        type: Number
    }
})

module.exports = movesSchema