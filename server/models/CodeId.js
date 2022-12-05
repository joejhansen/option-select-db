const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat')


const codeIdSchema = new Schema({
    appUser: { type: Schema.Types.ObjectId, ref: 'User' },
    connectCode: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
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