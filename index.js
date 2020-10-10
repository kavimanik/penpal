const cookieParser = require('cookie-parser')
const express = require('express')
const exphbs = require('express-handlebars')
const { join } = require('path')
const apiRouter = require('./routes/api')
const mongoose = require('mongoose')

require('dotenv/config')

mongoose.connect(process.env.MONGO_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

const app = express()

const hbs = exphbs.create({
  extname: '.hbs'
})

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(join(__dirname, 'public')))

app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')
app.set('views', join(__dirname, 'views'))

app.get('/', (req, res) => res.render('index.hbs'))
app.get('/login', (req, res) => res.render('login.hbs'))
app.get('/signup', (req, res) => res.render('signup.hbs'))
app.get('/writer', (req, res) => res.render('writer.hbs'))
app.get('/dashboard', (req, res) => res.render('dashboard.hbs'))

app.use('/api', apiRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
