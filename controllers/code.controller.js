const ApiError = require('../error/ApiError')
const Code = require('../models/code.model')
const User = require('../models/user.model')
const axios = require('axios')
const Token = require('../models/token.model')
const tokenService = require('../services/token.service')
const jwt = require('jsonwebtoken')

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

class CodeController {
  async sendCall(req, res, next) {
    const { phone } = req.body
    const user = await User.findOne({ phone: phone })

    if (user) {
      const code = await axios.get(`https://sms.ru/code/call?phone=${phone}&api_id=${process.env.SMS_API_KEY}`)
      if (code) {
        await Code.create({ user, code: code.data.code })
        return res.json({ message: 'код отправлен' })
      } else {
        return next(ApiError.badRequest('Ошибка отправки кода'))
      }
    } else {
      const newUser = await User.create({ phone })

      if (newUser) {
        const code = await axios.get(`https://sms.ru/code/call?phone=${phone}&api_id=${process.env.SMS_API_KEY}`)
        if (code) {
          await Code.create({ user: newUser._id, code: code.data.code })
          return res.json({ message: 'код отправлен' })
        } else {
          return next(ApiError.badRequest('Ошибка отправки кода'))
        }
      }
    }
  }

  async enterCode(req, res, next) {
    const { code, userId } = req.body
    const user = await User.findById(userId)
    const findCode = await Code.findOneAndDelete({ user: userId, code: code })

    if (findCode) {
      const token = generateJwt({ id: user._id, phone: user.phone, firstName: user.firstName, lastName: user.lastName, role: user.role })
      await tokenService.saveToken(user._id, token.accessToken, token.refreshToken)
      await res.cookie('refreshToken', token.refreshToken, {
        maxAge: 30 * 86400 * 1000,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        signed: true,
      })
      return res.json({ token: token.accessToken })
    } else {
      return res.json({ message: 'Неверный код' })
    }
  }
}

module.exports = new CodeController()
