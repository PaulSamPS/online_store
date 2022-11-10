const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/login', userController.login)
router.get('/get', userController.get)

module.exports = router
