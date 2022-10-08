const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', productController.setDayProducts)
router.get('/', productController.getDayProducts)
module.exports = router
