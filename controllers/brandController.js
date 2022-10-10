const Brand = require('../models/brand.model')
const ApiError = require('../error/ApiError')
const path = require('path')
const uuid = require('uuid')

class BrandController {
  async create(req, res) {
    const { name, link } = req.body
    console.log(req.file)
    const img = req.file.filename
    const brand = await Brand.create({ name, link, img })
    return res.json(brand)
  }

  async getAll(req, res) {
    const brands = await Brand.find()
    return res.json(brands)
  }
}

module.exports = new BrandController()
