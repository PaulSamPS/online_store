const {Brand, Type} = require('../models/models')
const ApiError = require('../error/ApiError')
const path = require("path");
const uuid = require('uuid')

class BrandController {
    async create(req, res) {
        const {name} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + '.png'
        await img.mv(path.resolve(__dirname, '..', 'static/brands', fileName))
        const brand = await Brand.create({name, img: fileName})
        return res.json(brand)
    }

    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }

}

module.exports = new BrandController()