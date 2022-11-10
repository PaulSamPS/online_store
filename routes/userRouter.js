const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.get('/login', userController.login)
router.post('/refresh-token', userController.check)

module.exports = router
