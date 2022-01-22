const {Menu} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require("uuid");
const path = require("path");


const createMenu = async (req, res) => {
    const {name,link} = req.body
    const {img} = req.files
    let fileName = uuid.v4() + '.svg'
    await img.mv(path.resolve(__dirname, '..', 'static/menu', fileName))
    const type = await Menu.create({
        name,
        link,
        img: fileName
    })
    console.log(link)
    return res.json(type)
}

const deleteMenu = async (req, res, next) => {
    try {
        await Menu.destroy({where: {id: req.params.id}})
        res.status(200).json('Тип удалён')
    } catch (e) {
        next(ApiError.internal(e))
    }
}

const getMenu = async (req, res) => {
    const types = await Menu.findAll()
    return res.json(types)
}


module.exports = {
    createMenu,
    deleteMenu,
    getMenu
}