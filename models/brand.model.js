const { Schema, model } = require('mongoose')

const BrandSchema = new Schema(
    {
        name: {type: String, unique: true},
        img: {type: String}
    },
    { timestamps: true }
)

module.exports = model('Brand', BrandSchema)