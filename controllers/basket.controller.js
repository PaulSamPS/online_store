const Basket = require('../models/basket.model')
const Product = require('../models/product.model')

let basketId

const maxAge = 30 * 86400 * 1000
const signed = true

class BasketController {
  async create(req, res) {
    if (req.signedCookies.basketId) {
      basketId = req.signedCookies.basketId
      res.cookie('basketId', basketId, { maxAge, signed })
      const basket = await Basket.findById(basketId).populate('products.product')
      return res.json(basket)
    }

    if (!req.signedCookies.basketId) {
      let created = await new Basket({ products: [], totalPrice: 0 }).save()
      basketId = created._id
      res.cookie('basketId', basketId, { maxAge, signed })
      const basket = await Basket.findById(basketId).populate('products.product')
      return res.json(basket)
    }
  }

  async addToBasket(req, res) {
    const { productId } = req.body
    if (req.signedCookies.basketId) {
      const product = await Product.findById(productId)
      const basket = await Basket.findById(req.signedCookies.basketId).populate('products.product')
      basket.products.push({ name: product.name })
      await basket.save()
      return res.json(basket)
    }
  }
}

module.exports = new BasketController()
