const { Schema, model } = require('mongoose')

const MenuSchema = new Schema(
  {
    firstCategory: {
      name: { type: String },
      img: { type: String },
      link: { type: String },
    },
    secondCategory: {
      name: { type: String },
      link: { type: String },
    },
    thirdCategory: [
      {
        name: { type: String },
        link: { type: String },
      },
    ],
    brands: [
      {
        name: { type: String, unique: true },
        img: { type: String },
        link: { type: String },
      },
    ],
  },
  { timestamps: true }
)

module.exports = model('Menu', MenuSchema)
