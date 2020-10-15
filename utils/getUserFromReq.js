const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports.getUserFromReq = async (req) => {
  const refreshToken = req.cookies.refresh_token || req.headers.refresh_token

  if (!refreshToken) {
    return undefined
  }

  try {
    jwt.verify(refreshToken, process.env.JWT_SECRET)
  } catch {
    return undefined
  }

  const { authorization } = req.headers
  if (!authorization || typeof authorization !== 'string' || !authorization.startsWith('Bearer ')) {
    return undefined
  }

  let accessTokenayload
  try {
    accessTokenayload = jwt.verify(authorization.split('Bearer ')[1], process.env.JWT_SECRET)
  } catch {
    accessTokenayload = undefined
  }

  if (!payload) {
    return undefined
  }

  return User.findOne({ id: payload.userID }) || undefined
}
