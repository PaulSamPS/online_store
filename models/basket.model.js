const { Schema, model } = require('mongoose')

const BasketSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        products: [
            {
                product: {type: Schema.Types.ObjectId, ref: 'Product'}
            }
        ],
        totalPrice: {type: Number}
    },
    { timestamps: true }
)

module.exports = model('Basket', BasketSchema)