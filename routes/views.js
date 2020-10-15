const { Router } = require('express')
const { getUserFromReq } = require('../utils/getUserFromReq')

const viewsRouter = Router()

viewsRouter.get('/', async (req, res) => {
  const user = await getUserFromReq(req)
  return res.render('index.hbs', { helpers: { user } })
})

viewsRouter.get('/login', async (req, res) => {
  const user = await getUserFromReq(req)
  if (user) {
    return res.redirect('/dashboard')
  }
  return res.render('login.hbs')
})

viewsRouter.get('/signup', async (req, res) => {
  const user = await getUserFromReq(req)
  if (user) {
    return res.redirect('/dashboard')
  }
  return res.render('signup.hbs')
})

viewsRouter.get('/writer', async (req, res) => {
  const user = await getUserFromReq(req)
  if (!user) {
    res.status(404)
    return res.redirect('/login')
  }
  return res.render('writer.hbs', { helpers: { user } })
})

viewsRouter.get('/dashboard', async (req, res) => {
  const user = await getUserFromReq(req)
  if (!user) {
    res.status(404)
    return res.redirect('/login')
  }
  return res.render('dashboard.hbs', { helpers: { user } })
})

module.exports = viewsRouter
