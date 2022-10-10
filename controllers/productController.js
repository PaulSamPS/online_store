const ApiError = require('../error/ApiError')
const Product = require('../models/product.model')
const ProductFeatures = require('../models/productFeatures.model')

let dayProducts = []
let productsYesterday = []
class ProductController {
  async addProduct(req, res, next) {
    try {
      let { name, price, oldPrice, rating, features, inStock } = req.body
      const paths = req.files.map((file) => ({ fileName: file.filename }))
      const featuresItem = JSON.parse(features)

      console.log(JSON.parse(features))

      const product = await Product.create({
        name,
        price,
        oldPrice,
        rating,
        img: paths,
        inStock: 10,
        features: featuresItem,
      })

      res.status(200).send(product)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async deleteProduct(req, res, next) {
    try {
      await Product.findByIdAndDelete(req.params.id)
      res.status(200).json('Продукт удалён')
    } catch (e) {
      next(ApiError.internal(e))
    }
  }

  async getAllProducts(req, res) {
    const product = await Product.find()
    return res.json(product)
  }

  async getOneProduct(req, res) {
    const { id } = req.params
    const product = await Product.findById(id)
    return res.json(product)
  }

  async setDayProducts(req, res) {
    const product = await Product.find()

    if (product) {
      productsYesterday = dayProducts
      dayProducts = []
      const p = product.map((i) => i)
      for (let i = 0; i < 5; i++) {
        const ind = Math.floor(Math.random() * p.length)
        const item = p[ind]
        if (item.oldPrice > 0) {
          dayProducts.push(p.splice(ind, 1)[0])
        }
      }
      return res.json(dayProducts)
    }
    return res.json({ message: 'Продукты не найдены' })
  }

  async getDayProducts(req, res) {
    res.json(dayProducts)
  }

  async getProductsYesterday(req, res) {
    res.json(productsYesterday)
  }
}

module.exports = new ProductController()
