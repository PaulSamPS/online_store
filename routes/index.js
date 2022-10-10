const Router = require('express')
const router = new Router()
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const menuRouter = require('./menuRouter')
const productRouter = require('./productRouter')
const userRouter = require('./userRouter')
const dayProductsRouter = require('./dayProductsRouter')
const productsYesterdayRouter = require('./productsYesterday')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/product', productRouter)
router.use('/menu', menuRouter)
router.use('/day-products', dayProductsRouter)
router.use('/products-yesterday', productsYesterdayRouter)

module.exports = router
