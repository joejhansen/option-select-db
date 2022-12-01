const { Schema, model } = require('mongoose');

const gameSchema = new Schema({

}
)

const Game = model('User', gameSchema)

module.exports = Game