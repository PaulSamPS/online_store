const { Schema, model } = require('mongoose')

const TokenSchema = new Schema(
    {
        token: {type: String},
        user: { type: Schema.Types.ObjectId, ref: 'User' }
    },
    { timestamps: true }
)

module.exports = model('Token', TokenSchema)