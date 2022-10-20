const { Schema, model } = require('mongoose')

const SliderSchema = new Schema(
  {
    l: [
      {
        name: { type: String },
        img: { type: String },
        link: { type: String },
      },
    ],
    s: [
      {
        name: { type: String },
        img: { type: String },
        link: { type: String },
      },
    ],
  },
  { timestamps: true }
)

module.exports = model('Slider', SliderSchema)
