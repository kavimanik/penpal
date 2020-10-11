const bcrypt = require('bcrypt')
const { Router } = require('express')
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')

const loginRouter = Router()

loginRouter.post('/', [body('username').isString(), body('password').isString()], async (req, res) => {
  const { errors } = validationResult(req)
  if (errors.length) {
    return res.status(422).json({ error: errors[0] })
  }

  const { username, password } = req.body

  const user = await User.findOne({ username })
  if (!user) {
    res.status(400)
    return res.json({ error: `Account with username ${username} does not exist` })
  }

  const correctPassword = await bcrypt.compare(password, user.password)
  if (!correctPassword) {
    res.status(404)
    return res.json({ error: 'Invalid password' })
  }

  const refreshToken = jwt.create(
    {
      type: 'user',
      userId: user.id
    },
    process.env.JWT_SECRET,
    { expiresIn: '1 day' }
  )

  const accessToken = jwt.create(
    {
      type: 'user',
      userId: user.id
    },
    process.env.JWT_SECRET,
    { expiresIn: '1 day' }
  )

  res.cookie('refresh_token', refreshToken), { httpOnly: true }
  return res.json({ accessToken })
})

module.exports = loginRouter
