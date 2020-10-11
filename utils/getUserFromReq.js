const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports.getUserFromReq = async (req) => {
  const refreshToken = req.cookies.refresh_token || req.headers.refresh_token

  if (!refreshToken || !jwt.verify(refreshToken)) {
    return undefined
  }

  const { authorization } = req.headers
  if (!authorization || typeof authorization !== 'string' || !authorization.startsWith('Bearer ')) {
    return undefined
  }

  const payload = jwt.verify(authorization.split('Bearer ')[1])

  if (!payload) {
    return undefined
  }

  return User.findOne({ id: payload.userID }) || undefined
}
