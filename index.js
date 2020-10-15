const cookieParser = require('cookie-parser')
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const { join } = require('path')
const apiRouter = require('./routes/api/login')
const viewsRouter = require('./routes/views')
const { getUserFromReq } = require('./utils/getUserFromReq')

require('dotenv/config')

mongoose.connect(process.env.MONGO_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

const app = express()

const hbs = exphbs.create({ extname: '.hbs' })

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(join(__dirname, 'public')))

app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')
app.set('views', join(__dirname, 'views'))

app.use('/api', apiRouter)
app.use('/', viewsRouter)

// lazy 404
app.use('*', (req, res) => {
  res.status(404)
  return res.redirect('/')
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
