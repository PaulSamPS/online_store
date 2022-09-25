const { Schema, model } = require('mongoose')

const TypeSchema = new Schema(
    {
        name: {type: String, unique: true},
        img: {type: String}
    },
    { timestamps: true }
)

module.exports = model('Type', TypeSchema)