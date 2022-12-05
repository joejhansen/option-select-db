// DO NOT USE!!!
// DO NOT USE!!!
// DO NOT USE!!!
// DO NOT USE!!!

const { Schema, model } = require('mongoose');

const playerSettingsSchema = new Schema({
    connectName: { type: Schema.Types.ObjectId, ref: 'ConnectName' },
    playerIndex: {
        type: Number,
        required: true,
        unique: false,
    },
    port: {
        type: Number,
        required: true,
        unique: false,
    },
    characterId: {
        type: Number,
        required: true,
        unique: false,
    },
    characterColor: {
        type: Number,
        required: true,
        unique: false,
    },
    startStocks: {
        type: Number,
        required: true,
        unique: false,
    },
    type: {
        type: Number,
        required: true,
        unique: false,
    },
    teamId: {
        type: Number,
        required: true,
        unique: false,
    },
    controllerFix: {
        type: String,
        required: false,
        unique: false,
    },
    nametag: {
        type: String,
        required: false,
        unique: false,
    },
})

// const PlayerInfo = model('PlayerInfo', playerInfoSchema)

module.exports = playerSettingsSchema