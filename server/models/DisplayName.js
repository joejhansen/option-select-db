const { Schema, model } = require('mongoose');

const displayNameSchema = new Schema({
    displayName: {
        type: String,
        required: true,
        unique: true,
        maxLength: [15, "Display name can't be more than 15 character"],
        minLength: [1, "A display name is required"]
    },
    codeIds: [{ type: Schema.Types.ObjectId, ref: 'CodeId' }],
})

const DisplayName = model('DisplayName', displayNameSchema)

module.exports = DisplayName