const { Schema } = require('mongoose')

const metadataPlayerSchema = new Schema({
    names: {
        netplay: {
            type: String
        },
        code: {
            type: String
        }
    },
    character: Number
})

module.exports = metadataPlayerSchema