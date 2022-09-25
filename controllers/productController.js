const ApiError = require('../error/ApiError')
const Product = require('../models/product.model')

const addProduct = async (req, res, next) => {
    try {
        let {name, price, oldPrice, rating, info} = req.body
        const paths = req.files.map((file) => ({fileName: file.filename}))
        const product = await Product.create({
            name,
            price,
            oldPrice,
            rating,
            img: paths

        })
        if (info) {
            info = JSON.parse(info)
            info.forEach(i =>
                ProductInfo.create({
                    title: i.title,
                    description: i.description,
                    productId: product.id
                })
            )
        }
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
    const product = await Product.find()
    return res.json(product)
}

const getOneProduct = async (req, res) => {
    const {id} = req.params
    const product = await Product.findOne(
        {
            where: {id},
            include: [{model: ProductInfo, as: 'info'}]
        }
    )
    return res.json(product)
}





module.exports = {
    addProduct,
    deleteProduct,
    getAllProducts,
    getOneProduct
}