const { Schema, model } = require('mongoose');


const metadataSchema = new Schema({
    _id: Schema.Types.ObjectId,
    // more stuff
})

const Metadata = model('Metadata', metadataSchema)

module.exports = Metadata