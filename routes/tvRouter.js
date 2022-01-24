const Router = require('express')
const router = new Router()
const tvController = require('../controllers/tvController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/',tvController.upload.array('img', 10),tvController.addTv)
router.delete('/:id', checkRole('ADMIN'), tvController.deleteTv)
router.get('/', tvController.getAllTv)
router.get('/:id', tvController.getOneTv)

module.exports = router