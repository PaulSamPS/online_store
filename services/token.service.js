const Token = require('../models/token.model')
const jwt = require('jsonwebtoken')

class TokenService {
  async saveToken(user, accessToken, refreshToken) {
    const tokenData = await Token.findOne({ user: user })
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      tokenData.accessToken = accessToken
      return tokenData
    } else {
      return await Token.create({ user: user, accessToken, refreshToken })
    }
  }

  validateAccessToken(token) {
    try {
      return jwt.verify(token, process.env.SECRET_KEY)
    } catch (e) {
      return null
    }
  }

  validateRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.SECRET_REFRESH_KEY)
    } catch (e) {
      return null
    }
  }

  async removeToken(refreshToken) {
    return Token.deleteOne({ refreshToken: refreshToken })
  }

  async findToken(refreshToken) {
    return Token.findOne({ refreshToken: refreshToken })
  }
}

module.exports = new TokenService()
