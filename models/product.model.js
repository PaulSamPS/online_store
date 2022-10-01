const { Schema, model } = require('mongoose')

const ProductSchema = new Schema(
  {
    name: { type: String, unique: true },
    img: [],
    rating: { type: Number, defaultValue: 0 },
    price: { type: Number, defaultValue: 0 },
    oldPrice: { type: Number },
    features: [
      {
        title: { type: String },
        item: [
          {
            name: { type: String },
            description: { type: String },
          },
        ],
      },
    ],
    inStock: { type: Number, defaultValue: 0 },
  },
  { timestamps: true }
)

module.exports = model('Product', ProductSchema)
