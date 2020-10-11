const bcrypt = require('bcrypt')
const { Router } = require('express')
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')

const signupRouter = Router()

signupRouter.post('/', [body('username').isString(), body('password').isString()], async (req, res) => {
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

module.exports = signupRouter
