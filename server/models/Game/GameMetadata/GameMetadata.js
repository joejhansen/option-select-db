const { Schema, model } = require('mongoose');
const Player = require('./MetadataPlayer')

// DONE I THINK
const gameMetadataSchema = new Schema({
    startAt: {
        type: Date
    },
    lastFrame: {
        type: Number
    },
    players: [Player],
    playedOn: {
        type: String
    }
})

module.exports = gameMetadataSchema