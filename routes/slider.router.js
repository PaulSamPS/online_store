const Router = require('express')
const router = new Router()
const sliderController = require('../controllers/slider.controller')
const fileUpload = require('../utils/fileUpload')

router.post('/initial', sliderController.create)
router.post('/', fileUpload.upload('slider').single('img'), sliderController.append)
router.get('/', sliderController.getSlider)

module.exports = router
