const Router = require('express')
const router = new Router()
const menuController = require('../controllers/menuController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), menuController.createMenu)
router.delete('/:id', checkRole('ADMIN'), menuController.deleteMenu)
router.get('/', menuController.getMenu)

module.exports = router