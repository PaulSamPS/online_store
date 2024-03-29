const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next()
  }
  try {
    const token = req.signedCookies.accessToken
    if (!token) {
      return res.status(401).json({ message: 'Не авторизован' })
    }
    req.user = jwt.verify(token, process.env.SECRET_KEY)
    next()
  } catch (e) {
    res.status(401).json({ message: 'Не авторизован' })
  }
}
