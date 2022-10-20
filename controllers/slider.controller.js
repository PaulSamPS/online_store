const Slider = require('../models/slider.model')

class SliderController {
  async create(req, res) {
    const slider = await Slider.create({ l: [], s: [] })
    return res.json(slider)
  }

  async append(req, res) {
    const { name, link, type } = req.body
    const slider = await Slider.findOne()

    const sliderItem = {
      name,
      link,
      img: req.file.filename,
    }

    if (type === 'large') {
      slider.l.push(sliderItem)

      await slider.save()
    }

    if (type === 'small') {
      slider.s.push(sliderItem)

      await slider.save()
    }

    return res.json(slider)
  }

  async getSlider(req, res) {
    const slider = await Slider.find()

    return res.json(slider)
  }
}

module.exports = new SliderController()
