const {Product, ProductInfo} = require('../models/models')
const ApiError = require('../error/ApiError')

const addProduct = async (req, res, next) => {
    try {
        let {name, price, oldPrice, rating, info} = req.body
        const paths = req.files.map((file) => ({fileName: file.filename}))
        const product = await Product.create({
            name,
            price,
            oldPrice,
            rating,
            img: JSON.stringify(paths)

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
        console.log(paths)
        res.status(200).send(product)
    } catch (e) {
        next(ApiError.badRequest(e.message))
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        await Product.destroy({where: {id: req.params.id}})
        res.status(200).json('Продукт удалён')
    } catch (e) {
        next(ApiError.internal(e))
    }
}

const getAllProducts = async (req, res) => {
    let {brandId, typeId, limit, page} = req.query
    page = page || 1
    limit = limit || 20
    let offset = page * limit - limit
    let product
    if (!brandId && !typeId) {
        product = await Product.findAndCountAll({limit, offset,  include: [{model: ProductInfo, as: 'info'}]})
    }
    if (brandId && !typeId) {
        product = await Product.findAndCountAll({where: {brandId}, limit, offset,  include: [{model: ProductInfo, as: 'info'}]})
    }
    if (!brandId && typeId) {
        product = Product.findAndCountAll({where: {typeId}, limit, offset,  include: [{model: ProductInfo, as: 'info'}]})
    }
    if (brandId && typeId) {
        product = Product.findAndCountAll({where: {brandId, typeId}, limit, offset,  include: [{model: ProductInfo, as: 'info'}]})
    }
    return res.json(product.rows)
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