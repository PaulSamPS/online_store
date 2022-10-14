const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const Basket = require('../models/basket.model')
const Token = require('../models/token.model')
const tokenService = require('../services/token.service')

const generateJwt = (payload) => {
  const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: '24h',
  })
  const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH_KEY, {
    expiresIn: '30d',
  })
  return {
    accessToken,
    refreshToken,
  }
}

class UserController {
  async registration(req, res, next) {
    const { email, password, userName, role } = req.body
    if (!email || !password) {
      return next(ApiError.internal('Некорректный email или password'))
    }
    const candidateEmail = await User.findOne({ email: email })
    if (candidateEmail) {
      return next(ApiError.internal('Пользователь с таким email уже существует'))
    }
    const candidateUserName = await User.findOne({ userName: userName })
    if (candidateUserName) {
      return next(ApiError.internal('Пользователь с таким логином уже существует'))
    }
    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({ email, role, password: hashPassword, userName })
    await Basket.create({ userId: user._id })
    const token = generateJwt({ id: user._id, email: user.email, userName: user.userName, role: user.role })
    await Token.create({ accessToken: token.accessToken, refreshToken: token.refreshToken, user: user._id })
    await res.cookie('refreshToken', token.refreshToken, {
      maxAge: 30 * 86400 * 1000,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      signed: true,
    })
    return res.json({ token: token.accessToken })
  }

  async login(req, res, next) {
    const { email, password } = req.body
    const user = await User.findOne({ email: email }).select('+password')
    if (!user) {
      return next(ApiError.internal('Пользователь с таким логином не найден'))
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(ApiError.internal('Неверный пароль'))
    }
    const token = generateJwt({ _id: user._id.toString(), email: user.email, userName: user.userName, role: user.role })
    await tokenService.saveToken(user._id, token.accessToken, token.refreshToken)
    await res.cookie('refreshToken', token.refreshToken, {
      maxAge: 30 * 86400 * 1000,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      signed: true,
    })
    return res.json({ token: token.accessToken })
  }

  async check(req, res, next) {
    const validateToken = await tokenService.validateRefreshToken(req.signedCookies.refreshToken)
    if (validateToken) {
      if (Date.now() >= validateToken.exp * 1000) {
        return next(ApiError.unauthorized('Токен просрочен'))
      }
      const token = generateJwt({
        id: validateToken._id,
        email: validateToken.email,
        userName: validateToken.userName,
        role: validateToken.role,
      })
      await res.cookie('refreshToken', token.refreshToken, {
        maxAge: 30 * 86400 * 1000,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        signed: true,
      })
      return res.json({ token: token.accessToken })
    }
  }
}

module.exports = new UserController()
