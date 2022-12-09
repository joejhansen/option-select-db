const { Schema } = require('mongoose')

const metadataPlayerSchema = new Schema({
    names: {
        netplay: {
            type: String,
            required: true,
            minLength: [1, 'Game must have netplay participant'],
        },
        code: {
            type: String,
            required: true,
            minLength: [1, 'Game must have a netplay participant']
        }
    },
    characters: [Number]
})

module.exports = metadataPlayerSchema