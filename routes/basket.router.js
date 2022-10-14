const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basket.controller')
const checkRole = require('../middleware/checkRoleMiddleware')
const fileUpload = require('../utils/fileUpload')

router.post('/', basketController.addToCart)

module.exports = router
