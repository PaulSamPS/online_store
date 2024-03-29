const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basket.controller')
const checkRole = require('../middleware/checkRoleMiddleware')
const fileUpload = require('../utils/fileUpload')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/add', basketController.addToBasket)
router.post('/decrease', basketController.decrease)
router.post('/increase-input', basketController.increase)
router.post('/delete-product', authMiddleware, basketController.delete)
router.get('/clear', basketController.clear)
router.get('/', basketController.create)
router.get('/get', basketController.getBasket)

module.exports = router
