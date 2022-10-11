const { Schema, model } = require('mongoose')

const ProductSchema = new Schema(
  {
    name: { type: String, unique: true },
    img: [],
    rotate3d: [],
    rating: { type: Number, defaultValue: 0 },
    price: { type: Number, defaultValue: 0 },
    oldPrice: { type: Number },
    inStock: { type: Number, defaultValue: 0 },
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
    reviews: [
      {
        name: { type: String },
        city: { type: String },
        email: { type: String },
        rating: { type: Number },
        review: { type: String },
      },
      { timestamps: true },
    ],
  },
  { timestamps: true }
)

module.exports = model('Product', ProductSchema)
