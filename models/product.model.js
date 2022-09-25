const { Schema, model } = require('mongoose')

const ProductSchema = new Schema(
    {
        name: {type: String, unique: true},
        images: [{
            img: {type: String}
        }],
        rating: {type: Number, defaultValue: 0},
        price: {type: Number, defaultValue: 0},
        oldPrice: {type: Number},
        info: { type: Schema.Types.ObjectId, ref: 'ProductInfo' }
    },
    { timestamps: true }
)

module.exports = model('Product', ProductSchema)