const cookieParser = require('cookie-parser')
const express = require('express')
const { join } = require('path')
const apiRouter = require('./routes/api')

require('dotenv/config')

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(join(__dirname, 'public')))

app.get('/', (_, res) => res.sendFile(join(__dirname, 'views', 'index.html')))
app.get('/dashboard', (_, res) => res.sendFile(join(__dirname, 'views', 'dashboard.html')))
app.get('/signup', (_, res) => res.sendFile(join(__dirname, 'views', 'signup.html')))
app.get('/writer', (_, res) => res.sendFile(join(__dirname, 'views', 'writer.html')))
app.get('/login', (_, res) => res.sendFile(join(__dirname, 'views', 'login.html')))

app.use('/api.js', apiRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
