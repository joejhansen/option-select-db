const { Schema, model } = require('mongoose');

const displayNameSchema = new Schema({
    displayName: {
        type: String,
        required: true,
        unique: true,
        maxLength: 15,
    },
    codeIds: [{ type: Schema.Types.ObjectId, ref: 'CodeId' }],
})

const DisplayName = model('DisplayName', displayNameSchema)

module.exports = DisplayName