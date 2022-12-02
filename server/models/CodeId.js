const { Schema, model } = require('mongoose');


const codeIdSchema = new Schema({
    _id: Schema.Types.ObjectId,
    code: {
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
    }
})

const CodeId = model('CodeId', codeIdSchema)

module.exports = CodeId