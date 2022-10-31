const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basket.controller')
const checkRole = require('../middleware/checkRoleMiddleware')
const fileUpload = require('../utils/fileUpload')

router.post('/add', basketController.addToBasket)
router.post('/decrease', basketController.decrease)
router.post('/increase-input', basketController.increase)
router.get('/', basketController.create)
router.get('/get', basketController.getBasket)

module.exports = router
