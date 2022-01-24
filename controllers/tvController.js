const uuid = require('uuid')
const path = require('path')
const {Tv, TvInfo} = require('../models/models')
const ApiError = require('../error/ApiError')
const multer = require("multer");
const {DataTypes} = require("sequelize");

    // const create = async (req, res, next) {
    //
    //     try {
    //         let info = {
    //             img: req.file.path,
    //             name: req.body.name,
    //             price: req.body.price,
    //             category: req.body.category
    //         }
    //
    //         const product = await Product.create(info)
    //         res.status(200).send(product)
    //         console.log(product)
    //         // const product = await Product.create(p)
    //         // let messages = []
    //         // let {name, price, brandId, category, typeId, info} = req.body
    //         // let {camera,weight} = req.body
    //         // const {img} = req.files
    //         // const {img} = req.files
    //         // let fileName = uuid.v4() + '.jpg'
    //         // await img.mv(path.resolve(__dirname, '..', 'static', fileName))
    //         // const product = await Product.create({ typeId, name,price, brandId, category, img})
    //         // if (info) {
    //         //     info = JSON.parse(info)
    //         //     info.forEach(i =>
    //         //         ProductInfo.create({
    //         //             title: i.title,
    //         //             description: i.description,
    //         //             deviceId: product.id
    //         //         })
    //         //     )
    //         // }
    //     } catch (e) {
    //         next(ApiError.badRequest(e.message))
    //     }
    // }

const addTv = async (req, res, next) => {
    try {
        let {name, price, oldPrice, rating, info} = req.body
        const paths = req.files.map((file) => ({fileName: file.filename}))
        const tv = await Tv.create({
            name,
            price,
            oldPrice,
            rating,
            img: JSON.stringify(paths),

        })
        console.log(tv)
        if (info) {
            info = JSON.parse(info)
            info.forEach(i =>
                TvInfo.create({
                    title: i.title,
                    description: i.description,
                    tvId: tv.id
                })
            )
        }
        console.log(paths)
        res.status(200).send(tv)
    } catch (e) {
        next(ApiError.badRequest(e.message))
    }
}

const deleteTv = async (req, res, next) => {
    try {
        await Tv.destroy({where: {id: req.params.id}})
        res.status(200).json('Продукт удалён')
    } catch (e) {
        next(ApiError.internal(e))
    }
}

const getAllTv = async (req, res) => {
    let {brandId, typeId, limit, page} = req.query
    page = page || 1
    limit = limit || 9
    let offset = page * limit - limit
    let product
    if (!brandId && !typeId) {
        product = await Tv.findAndCountAll({limit, offset,  include: [{model: TvInfo, as: 'info'}]})
    }
    if (brandId && !typeId) {
        product = await Tv.findAndCountAll({where: {brandId}, limit, offset,  include: [{model: TvInfo, as: 'info'}]})
    }
    if (!brandId && typeId) {
        product = Tv.findAndCountAll({where: {typeId}, limit, offset,  include: [{model: TvInfo, as: 'info'}]})
    }
    if (brandId && typeId) {
        product = Tv.findAndCountAll({where: {brandId, typeId}, limit, offset,  include: [{model: TvInfo, as: 'info'}]})
    }
    return res.json(product.rows)
}

const getOneTv = async (req, res) => {
    const {id} = req.params
    const tv = await Tv.findOne(
        {
            where: {id},
            include: [{model: TvInfo, as: 'info'}]
        }
    )
    return res.json(tv)
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'static')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files format to upload')
    }
})



module.exports = {
    addTv,
    deleteTv,
    getAllTv,
    getOneTv,
    upload
}