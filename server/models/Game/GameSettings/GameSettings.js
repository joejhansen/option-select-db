const { Schema } = require('mongoose')
const Player = require('./SettingsPlayer')
// DONE I THINK
const gameSettingsSchema = new Schema(
    {
        slpVersion: {
            type: String
        },
        isTeams: {
            type: Boolean
        },
        isPAL: {
            type: Boolean
        },
        stageId: {
            type: Number
        },
        players: [Player],
        scene: {
            type: Number
        },
        gameMode: {
            type: Number
        },
        language: {
            type: Number
        }
    }
)

module.exports = gameSettingsSchema