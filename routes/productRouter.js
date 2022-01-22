const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/', checkRole('ADMIN'),productController.upload.array('img', 5),productController.createProduct)
router.delete('/:id', checkRole('ADMIN'), productController.deleteProduct)
router.get('/', productController.getAllProducts)
router.get('/:id', productController.getOneProduct)

module.exports = router