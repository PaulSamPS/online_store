const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const Basket = require('../models/basket.model')
const Token = require('../models/token.model')

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
        const candidateEmail = await User.findOne({email: email})
        if (candidateEmail) {
            return next(ApiError.internal('Пользователь с таким email уже существует'))
        }
        const candidateUserName = await User.findOne({userName: userName})
        if (candidateUserName) {
            return next(ApiError.internal('Пользователь с таким логином уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword, userName})
        await Basket.create({userId: user._id})
        const token = generateJwt(user._id, user.email, user.userName, user.role)
        await Token.create({token, user: user._id})
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({email: email}).select('+password')
        if (!user) {
            return next(ApiError.internal('Пользователь с таким логином не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Неверный пароль'))
        }
        const token = generateJwt(user._id, user.email, user.userName, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.userName, req.user.role)
        return res.json({token})
    }

}

module.exports = new UserController()