const { Schema } = require('mongoose')

const metadataPlayerSchema = new Schema({
    names: {
        netplay: {
            type: String
        },
        code: {
            type: Date
        }
    },
    character: Number
})

module.exports = metadataPlayerSchema