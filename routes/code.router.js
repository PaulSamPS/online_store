const Router = require('express')
const router = new Router()
const codeController = require('../controllers/code.controller')

router.post('/get', codeController.sendCall)
router.post('/enter-code', codeController.enterCode)

module.exports = router
