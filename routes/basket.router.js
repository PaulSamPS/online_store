const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basket.controller')
const checkRole = require('../middleware/checkRoleMiddleware')
const fileUpload = require('../utils/fileUpload')

router.get('/', basketController.create)
router.post('/add', basketController.addToBasket)
router.get('/get', basketController.getBasket)

module.exports = router
