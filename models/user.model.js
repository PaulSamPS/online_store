const { Schema, model } = require('mongoose')

const UserSchema = new Schema(
    {
        userName: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true, select: false },
        role: {type: String, default: 'User', select: false }
    },
    { timestamps: true }
)

module.exports = model('User', UserSchema)