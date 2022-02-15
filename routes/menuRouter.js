const Router = require('express')
const router = new Router()
const menuController = require('../controllers/menuController')
const checkRole = require('../middleware/checkRoleMiddleware')
const fileUpload = require('../utils/fileUpload')

router.post('/', checkRole('ADMIN'), fileUpload.upload.single('img'), menuController.createMenu)
router.delete('/:id', checkRole('ADMIN'), menuController.deleteMenu)
router.get('/', menuController.getMenu)

module.exports = router