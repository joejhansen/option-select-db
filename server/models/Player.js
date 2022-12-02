const { Schema, model } = require('mongoose');

const playerSchema = new Schema({
    
}
)

const Player = model('Player', playerSchema)

module.exports = Player