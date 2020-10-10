import cookieParser from 'cookie-parser'
import 'dotenv/config.js'
import express from 'express'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import apiRouter from './routes/api.js'

const app = express()

const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(join(__dirname, 'public')))

app.get('/', (_, res) => res.sendFile(join(__dirname, 'views', 'index.html')))
app.get('/letterDashboardTemplate', (_, res) => res.sendFile(join(__dirname, 'views', 'letterDashboardTemplate.html')))

app.use('/api.js', apiRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
