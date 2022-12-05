const { Schema, model } = require('mongoose');

const stockSchema = new Schema({
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
    endPercent: {
        type: Number
    },
    currentPercent: {
        type: Number
    },
    count: {
        type: Number
    },
    deathAnimation: {
        type: Number
    }
})


module.exports = stockSchema