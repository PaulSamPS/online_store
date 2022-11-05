const Router = require('express')
const router = new Router()
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const menuRouter = require('./menuRouter')
const productRouter = require('./productRouter')
const userRouter = require('./userRouter')
const dayProductsRouter = require('./dayProductsRouter')
const productsYesterdayRouter = require('./productsYesterday')
const basketRouter = require('./basket.router')
const sliderLargeRouter = require('./slider.router')
const codeRouter = require('./code.router')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/products', productRouter)
router.use('/menu', menuRouter)
router.use('/day-products', dayProductsRouter)
router.use('/products-yesterday', productsYesterdayRouter)
router.use('/basket', basketRouter)
router.use('/slider', sliderLargeRouter)
router.use('/code', codeRouter)

module.exports = router
