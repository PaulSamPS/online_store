const {Type, Product} = require('../models/models')
const ApiError = require('../error/ApiError')

class TypeController {
    async create(req, res) {
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }

    async delete (req, res, next) {
        try {
            await Type.destroy({where: {id: req.params.id}})
            res.status(200).json('Тип удалён')
        } catch (e) {
            next(ApiError.internal(e))
        }
    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }

}

module.exports = new TypeController()