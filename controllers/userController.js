const ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')
const tokenService = require('../services/token.service')
const cookieParser = require('cookie-parser')

const maxAge = 86400 * 100
const signed = true

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
  async get(req, res, next) {
    const accessToken = cookieParser.signedCookie(req.headers.accesstoken, process.env.SECRET_COOKIE)
    const refreshToken = cookieParser.signedCookie(req.headers.refreshtoken, process.env.SECRET_COOKIE)
    if (!accessToken && !refreshToken) {
      return next(ApiError.unauthorized('Токены просрочены'))
    }

    if (!accessToken && refreshToken) {
      const validateToken = await tokenService.validateRefreshToken(refreshToken)
      if (validateToken) {
        if (Date.now() >= validateToken.exp * 1000) {
          return next(ApiError.unauthorized('Refresh токен просрочен'))
        }
        const token = generateJwt({
          id: validateToken.id,
          phone: validateToken.phone,
          firstName: validateToken.firstName,
          lastName: validateToken.lastName,
          role: validateToken.role,
        })
        return res.json({ token: token.accessToken })
      }
    }

    if (accessToken) {
      const validateToken = await tokenService.validateAccessToken(accessToken)
      if (validateToken) {
        if (Date.now() >= validateToken.exp * 1000) {
          return next(ApiError.unauthorized('Токен просрочен'))
        }
        const token = generateJwt({
          id: validateToken.id,
          phone: validateToken.phone,
          firstName: validateToken.firstName,
          lastName: validateToken.lastName,
          role: validateToken.role,
        })
        return res.json({ token: token.accessToken })
      }
    }
  }

  async login(req, res, next) {
    if (!req.signedCookies.accessToken && !req.signedCookies.refreshToken) {
      return next(ApiError.unauthorized('Токены просрочены'))
    }

    if (!req.signedCookies.accessToken && req.signedCookies.refreshToken) {
      const validateToken = await tokenService.validateRefreshToken(req.signedCookies.refreshToken)
      if (validateToken) {
        if (Date.now() >= validateToken.exp * 1000) {
          return next(ApiError.unauthorized('Refresh токен просрочен'))
        }
        const token = generateJwt({
          id: validateToken.id,
          phone: validateToken.phone,
          firstName: validateToken.firstName,
          lastName: validateToken.lastName,
          role: validateToken.role,
        })
        res.cookie('refreshToken', token.refreshToken, {
          maxAge: 30 * 86400 * 1000,
          httpOnly: true,
          sameSite: 'none',
          secure: true,
          signed: true,
        })
        res.cookie('accessToken', token.accessToken, {
          maxAge,
          httpOnly: true,
          sameSite: 'none',
          secure: true,
          signed: true,
        })
        return res.json({ token: token.accessToken })
      }
    }

    if (req.signedCookies.accessToken) {
      const validateToken = await tokenService.validateAccessToken(req.signedCookies.accessToken)
      if (validateToken) {
        if (Date.now() >= validateToken.exp * 1000) {
          return next(ApiError.unauthorized('Токен просрочен'))
        }
        const token = generateJwt({
          id: validateToken.id,
          phone: validateToken.phone,
          firstName: validateToken.firstName,
          lastName: validateToken.lastName,
          role: validateToken.role,
        })
        res.cookie('accessToken', token.accessToken, { maxAge, signed })
        return res.json({ token: token.accessToken })
      }
    }
  }
}

module.exports = new UserController()
