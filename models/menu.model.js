const { Schema, model } = require('mongoose')

const MenuSchema = new Schema(
    {
        name: {type: String},
        img: {type: String},
        link: {type: String}
    },
    { timestamps: true }
)

module.exports = model('Menu', MenuSchema)