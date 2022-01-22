const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')

const generateJwt = (id, email , userName, role) => {
    return jwt.sign(
        {id, email, userName, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, userName, role} = req.body
        if (!email || !password) {
            return next(ApiError.internal('Некорректный email или password'))
        }
        const candidateEmail = await User.findOne({where: {email}})
        if (candidateEmail) {
            return next(ApiError.internal('Пользователь с таким email уже существует'))
        }
        const candidateUserName = await User.findOne({where: {userName}})
        if (candidateUserName) {
            return next(ApiError.internal('Пользователь с таким логином уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword, userName})
        const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.userName, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password, userName} = req.body
        const user = await User.findOne({where: {userName}})
        if (!user) {
            return next(ApiError.internal('Пользователь с таким логином не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.userName, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.userName, req.user.role)
        return res.json({token})
    }

}

module.exports = new UserController()