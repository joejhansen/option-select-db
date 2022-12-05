const { Schema, model } = require('mongoose');


const codeIdSchema = new Schema({
    _id: Schema.Types.ObjectId,
    appUser: { type: Schema.Types.ObjectId, ref: 'User' },
    connectCode: {
        type: String,
        required: true,
        unique: false,
        trim: true,
    },
    userId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    displayNames: [{ type: Schema.Types.ObjectId, ref: 'DisplayName' }],
    games: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
})

const CodeId = model('CodeId', codeIdSchema)

module.exports = CodeId