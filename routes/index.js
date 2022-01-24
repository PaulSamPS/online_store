const Router = require('express')
const router = new Router()
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const menuRouter = require('./menuRouter')
const tvRouter = require('./tvRouter')
const userRouter = require('./userRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/tv', tvRouter)
router.use('/menu', menuRouter)

module.exports = router