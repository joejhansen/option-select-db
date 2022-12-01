const { Schema, model } = require('mongoose');

const playerSchema = new Schema({
    
}
)

const Player = model('User', playerSchema)

module.exports = Player