const { Schema, model } = require('mongoose')

const UserSchema = new Schema(
  {
    phone: { type: String, required: true, unique: true },
    email: { type: String, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    role: { type: String, default: 'User', select: false },
    orders: [
      {
        products: [
          {
            product: { type: Schema.Types.ObjectId, ref: 'Product' },
            qty: { type: Number },
          },
        ],
        totalPrice: { type: Number },
      },
      { timestamps: true },
    ],
  },
  { timestamps: true }
)

module.exports = model('User', UserSchema)
