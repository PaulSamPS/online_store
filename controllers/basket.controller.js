const Basket = require('../models/basket.model')
const cookieParser = require('cookie-parser')

let basketId

const maxAge = 30 * 86400 * 1000
const signed = true

const regexpId = (cookie) => {
  const basket = cookieParser.signedCookie(cookie, process.env.SECRET_COOKIE)
  return basket.split(/\"(.*?)\"/g)[1]
}

class BasketController {
  async getBasket(req, res) {
    if (req.headers.basket) {
      const basket = await Basket.findById(regexpId(req.headers.basket)).populate('products.product')
      return res.json(basket)
    }
  }

  async create(req, res) {
    console.log(req.cookies.basket)
    if (req.headers.basket) {
      console.log(regexpId(req.headers.basket))
      basketId = regexpId(req.headers.basket)
      res.cookie('basket', basketId, { maxAge, signed })
      const basket = await Basket.findById(basketId).populate('products.product')
      return res.json(basket)
    }

    if (!req.headers.basket) {
      let created = await Basket.create({ products: [], totalPrice: 0 })
      basketId = created._id
      res.cookie('basket', basketId, { maxAge, signed })
      const basket = await Basket.findById(basketId).populate('products.product')
      return res.json(basket)
    }
  }

  async addToBasket(req, res) {
    const { productId, productPrice } = req.body

    if (req.headers.basket) {
      basketId = regexpId(req.headers.basket)
      const basket = await Basket.findById(basketId).populate('products.product')
      const product = basket.products.find((p) => p.product._id.toString() === productId)

      if (basket.products.map((p) => p.product._id.toString()).includes(productId)) {
        product.qty += 1
        basket.totalPrice += product.product.price
        await basket.save()
        const newBasket = await Basket.findById(basketId).populate('products.product')
        return res.json(newBasket)
      } else {
        basket.products.unshift({ product: productId, qty: 1 })
        basket.totalPrice += productPrice
        await basket.save()
        const newBasket = await Basket.findById(basketId).populate('products.product')
        return res.json(newBasket)
      }
    } else {
      let created = await Basket.create({ products: [], totalPrice: 0 })
      basketId = created._id
      res.cookie('basket', basketId, { maxAge, signed })
      const newBasket = await Basket.findById(basketId).populate('products.product')

      return res.json(newBasket)
    }
  }
}

module.exports = new BasketController()
