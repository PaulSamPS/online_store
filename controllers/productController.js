const ApiError = require('../error/ApiError')
const Product = require('../models/product.model')
const ProductFeatures = require('../models/productFeatures.model')

const addProduct = async (req, res, next) => {
  try {
    let { name, price, oldPrice, rating, features, inStock } = req.body
    const paths = req.files.map((file) => ({ fileName: file.filename }))
    const featuresItem = JSON.parse(features)

    console.log(JSON.parse(features))

    const product = await Product.create({
      name,
      price,
      oldPrice,
      rating,
      img: paths,
      inStock: 10,
      features: featuresItem,
    })

    res.status(200).send(product)
  } catch (e) {
    next(ApiError.badRequest(e.message))
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.status(200).json('Продукт удалён')
  } catch (e) {
    next(ApiError.internal(e))
  }
}

const getAllProducts = async (req, res) => {
  const product = await Product.find().populate('features')
  return res.json(product)
}

const getOneProduct = async (req, res) => {
  const { id } = req.params
  const product = await Product.findOne({
    where: { id },
    include: [{ model: ProductInfo, as: 'info' }],
  })
  return res.json(product)
}

module.exports = {
  addProduct,
  deleteProduct,
  getAllProducts,
  getOneProduct,
}
