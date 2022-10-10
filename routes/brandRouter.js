const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')
const checkRole = require('../middleware/checkRoleMiddleware')
const fileUpload = require('../utils/fileUpload')

router.post('/', fileUpload.upload('brand').single('img'), brandController.create)
router.get('/', brandController.getAll)

module.exports = router
