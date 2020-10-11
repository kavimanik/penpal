const { Router } = require('express')

const viewsRouter = Router()

viewsRouter.get('/', (req, res) => {
  return res.render('index.hbs', { helpers: { test: '123' } })
})
viewsRouter.get('/login', (req, res) => res.render('login.hbs'))
viewsRouter.get('/signup', (req, res) => res.render('signup.hbs'))
viewsRouter.get('/writer', (req, res) => res.render('writer.hbs'))
viewsRouter.get('/dashboard', (req, res) => res.render('dashboard.hbs'))

module.exports = viewsRouter
