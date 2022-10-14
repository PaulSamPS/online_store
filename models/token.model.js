const { Schema, model } = require('mongoose')

const TokenSchema = new Schema(
    {
        accessToken: {type: String},
        refreshToken: { type: String},
        user: { type: Schema.Types.ObjectId, ref: 'User' }
    },
    { timestamps: true }
)

module.exports = model('Token', TokenSchema)