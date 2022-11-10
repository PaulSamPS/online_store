const Code = require('../models/code.model')
const User = require('../models/user.model')
const axios = require('axios')
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
    const code = await axios.get(`https://sms.ru/code/call?phone=${phone}&api_id=${process.env.SMS_API_KEY}`)

    if (user) {
      const userCode = await Code.findOne({ user: user._id })
      if (userCode) {
        userCode.code = code.data.code
        await userCode.save()
        return res.json(user)
      } else {
        await Code.create({ user: user._id, code: code.data.code })
      }
    } else {
      const newUser = await User.create({ phone })

      if (newUser) {
        await Code.create({ user: newUser._id, code: code.data.code })
        return res.json({ message: 'код отправлен' })
      }
    }
  }

  async enterCode(req, res, next) {
    const { code, userId } = req.body
    const findCode = await Code.findOne({ user: userId, code: code }).populate('user')
    const user = await User.findById(userId)

    if (findCode) {
      const token = generateJwt({
        id: findCode.user._id,
        phone: findCode.user.phone,
        firstName: findCode.user.firstName,
        lastName: findCode.user.lastName,
        role: findCode.user.role,
      })
      await tokenService.saveToken(findCode.user._id, token.accessToken, token.refreshToken)
      res.cookie('refreshToken', token.refreshToken, {
        maxAge: 30 * 86400 * 1000,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        signed: true,
      })
      res.cookie('accessToken', token.accessToken, {
        maxAge: 86400,
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
