const { Schema, model } = require('mongoose')

const BasketSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        products: [
            {
                product: {type: Schema.Types.ObjectId, ref: 'Product'}
            }
        ]
    },
    { timestamps: true }
)

module.exports = model('Basket', BasketSchema)