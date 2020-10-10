const { Router } = require('express')

const apiRouter = Router()

apiRouter.post('/messages', async (req, res) => {
  const { message, recipient, user } = req.body
  console.log(message)
  return res.json()
})

module.exports = apiRouter
