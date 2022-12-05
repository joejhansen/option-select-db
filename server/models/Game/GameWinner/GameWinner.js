const { Schema } = require('mongoose')

const gameWinnerSchema = new Schema({
    playerIndex:{
        type: Number
    },
    position: {
        type: Number
    }
})

module.exports = gameWinnerSchema
