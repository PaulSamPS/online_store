const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basket.controller')
const checkRole = require('../middleware/checkRoleMiddleware')
const fileUpload = require('../utils/fileUpload')

router.post('/', basketController.create)
router.post('/add-to-basket', basketController.addToBasket)

module.exports = router
