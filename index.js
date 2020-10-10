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

app.use('/api.js', apiRouter)

app.listen(3001, () => { // Temp changed port to just be a static number for testing purposes, process.env.PORT was returning undefined
  console.log(`Server running on port 3001`)
})
