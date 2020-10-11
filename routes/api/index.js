const { Router } = require('express')
const loginRouter = require('./login')
const messagesRouter = require('./messages')
const signupRouter = require('./signup')
const usersRouter = require('./users')

const apiRouter = Router()

apiRouter.use('/login', loginRouter)
apiRouter.use('/message', messagesRouter)
apiRouter.use('/signup', signupRouter)
apiRouter.use('/users', usersRouter)

module.exports = apiRouter
