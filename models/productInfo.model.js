const { Schema, model } = require('mongoose')

const ProductInfoSchema = new Schema(
    {
        title: {type: String},
        description: {type: String}
    },
    { timestamps: true }
)

module.exports = model('ProductInfo', ProductInfoSchema)