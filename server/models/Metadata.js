const { Schema, model } = require('mongoose');


const metadataSchema = new Schema({
    _id: Schema.Types.ObjectId,
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    // more stuff
})

const Metadata = model('Metadata', metadataSchema)

module.exports = Metadata