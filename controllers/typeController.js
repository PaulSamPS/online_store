const Type = require('../models/type.model')
const ApiError = require('../error/ApiError')

class TypeController {
    async create(req, res) {
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }

    async delete (req, res, next) {
        try {
            await Type.findByIdAndDelete(req.params.id)
            res.status(200).json('Тип удалён')
        } catch (e) {
            next(ApiError.internal(e))
        }
    }

    async getAll(req, res) {
        const types = await Type.find()
        return res.json(types)
    }

}

module.exports = new TypeController()