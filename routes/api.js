const bcrypt = require('bcrypt')
const { Router } = require('express')
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const apiRouter = Router()

apiRouter.post('/signup', [body('username').isString(), body('password').isString()], async (req, res) => {
  const { errors } = validationResult(req)
  if (errors.length) {
    return res.status(422).json({ error: errors[0] })
  }

  const { username, password } = req.body

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    res.status(400)
    return res.json({ error: 'An account with this username already exists' })
  }

  if (password.length < 8) {
    res.status(422)
    return res.json({ error: 'Your password must be at least 8 characters' })
  }

  const hash = bcrypt.hashSync(password, 10)

  const user = new User({ username, password: hash })
  await user.save()

  return res.json(user)
})

apiRouter.post('/login', [body('username').isString(), body('password').isString()], async (req, res) => {
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

apiRouter.post('/messages', async (req, res) => {
  const { message, recipient, user } = req.body
  console.log(message)
  return res.json()
})

module.exports = apiRouter
