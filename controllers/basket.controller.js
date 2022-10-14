const Basket = require('../models/basket.model')

let basketId

const maxAge = 30 * 86400 * 1000
const signed = true

class BasketController {
  async addToCart(req, res) {
    const { userId } = req.body

    if (req.signedCookies.basketId) {
      const basketCookie = await Basket.findById(req.signedCookies.basketId)

      if (basketCookie && userId) {
        ;(await basketCookie.user) !== userId ? (basketCookie.user = userId) : basketCookie.user
        await basketCookie.save()
        basketId = req.signedCookies.basketId
        res.cookie('basketId', basketId, { maxAge, signed })
        return res.json(basketCookie)
      }
      if (basketCookie && !userId) {
        basketId = req.signedCookies.basketId
        res.cookie('basketId', basketId, { maxAge, signed })
        return res.json(basketCookie)
      }
    }

    if (!req.signedCookies.basketId && !userId) {
      let created = await new Basket({ user: '', products: [], totalPrice: 0 }).save()
      basketId = created._id
      res.cookie('basketId', basketId, { maxAge, signed })
      const basket = await Basket.findById(basketId)
      return res.json(basket)
    }

    if (!req.signedCookies.basketId && userId) {
      const userBasket = await Basket.findOne({ user: userId })

      if (userBasket) {
        basketId = userBasket._id
        res.cookie('basketId', basketId, { maxAge, signed })
        return res.json(userBasket)
      }

      if (!userBasket) {
        let created = await new Basket({ user: userId, products: [], totalPrice: 0 }).save()
        basketId = created._id
        res.cookie('basketId', basketId, { maxAge, signed })
        const basket = await Basket.findById(basketId)
        return res.json(basket)
      }
    }
  }
}

module.exports = new BasketController()
