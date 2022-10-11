const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
const checkRole = require('../middleware/checkRoleMiddleware')
const fileUpload = require('../utils/fileUpload')

router.post('/', fileUpload.upload('product').fields([{name: 'img', maxCount: 10}, {name: 'rotate3d', maxCount: 50}]), productController.addProduct)
router.delete('/:id', checkRole('ADMIN'), productController.deleteProduct)
router.get('/', productController.getAllProducts)
router.get('/:id', productController.getOneProduct)

module.exports = router
