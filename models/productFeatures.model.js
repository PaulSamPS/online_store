const { Schema, model } = require('mongoose')

const ProductFeaturesSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    item: { type: String },
    description: { type: String },
  },
  { timestamps: true }
)

module.exports = model('ProductFeatures ', ProductFeaturesSchema)
