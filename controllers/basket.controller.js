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
      const basket = await Basket.findById(basketId).populate('products')
      return res.json(basket)
    }

    if (!req.signedCookies.basketId) {
      let created = await Basket.create({ products: [], totalPrice: 0 })
      basketId = created._id
      res.cookie('basketId', basketId, { maxAge, signed })
      const basket = await Basket.findById(basketId).populate('products')
      return res.json(basket)
    }
  }

  async addToBasket(req, res) {
    const { productId } = req.body
    if (req.signedCookies.basketId) {
      const basket = await Basket.findById(req.signedCookies.basketId).populate('products.product')

      basket.products.unshift({ product: productId, qty: 1 })
      await basket.save()
      return res.json(basket)
    }
  }
}

module.exports = new BasketController()
