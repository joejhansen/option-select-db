// DO NOT USE!!!
// DO NOT USE!!!
// DO NOT USE!!!
// DO NOT USE!!!

const { Schema } = require('mongoose');

const settingsPlayerSchema = new Schema({
    playerIndex: {
        type: Number
    },
    port: {
        type: Number
    },
    characterId: {
        type: Number
    },
    characterColor: {
        type: Number
    },
    startStocks: {
        type: Number
    },
    type: {
        type: Number
    },
    teamId: {
        type: Number
    },
    controllerFix: {
        type: String
    },
    nametag: {
        type: String
    },
    displayName: {
        type: String
    },
    connectCode: {
        type: String
    },
    userId: {
        type: String
    }
}
)

// const PlayerInfo = model('PlayerInfo', playerInfoSchema)

module.exports = settingsPlayerSchema