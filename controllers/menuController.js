const {Menu} = require('../models/models')
const ApiError = require('../error/ApiError')


const createMenu = async (req, res, next) => {
    try {
        const {name,link} = req.body
        const img = req.file.filename

        const menu = await Menu.create({
            name,
            link,
            img: JSON.stringify(img)
        })
        console.log(img)
        return res.json(menu)
    } catch (e) {
        next(ApiError.internal(e))
    }
}

const deleteMenu = async (req, res, next) => {
    try {
        await Menu.destroy({where: {id: req.params.id}})
        res.status(200).json('Объект меню удалён')
    } catch (e) {
        next(ApiError.internal(e))
    }
}

const getMenu = async (req, res, next) => {
    try {
        const menu = await Menu.findAll()
        return res.json(menu)
    } catch (e) {
        next(ApiError.internal(e))
    }
}


module.exports = {
    createMenu,
    deleteMenu,
    getMenu
}