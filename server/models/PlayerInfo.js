const { Schema, model } = require('mongoose');
const example = [
    {
        "playerIndex": 0,
        "port": 1,
        "characterId": 12,
        "characterColor": 0,
        "startStocks": 4,
        "type": 0,
        "teamId": 0,
        "controllerFix": "UCF",
        "nametag": "",
        "displayName": "TEST SLIPPI-JS",
        "connectCode": "PUSH#676",
        "userId": "QV2bSvShPUVT4ydFPOhfjb6BpEs2"
    },
    {
        "playerIndex": 1,
        "port": 2,
        "characterId": 23,
        "characterColor": 2,
        "startStocks": 4,
        "type": 0,
        "teamId": 1,
        "controllerFix": "UCF",
        "nametag": "",
        "displayName": "y",
        "connectCode": "NAEL#376",
        "userId": "LcGj7sD4TKTYLFe9E2FvPCVJnpk2"
    }
]
const playerInfoSchema = new Schema({
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
        trim: true,
    },
})

// const PlayerInfo = model('PlayerInfo', playerInfoSchema)

module.exports = playerInfoSchema