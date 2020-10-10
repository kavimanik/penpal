const { Schema, model } = require('mongoose')

const messageSchema = new Schema(
  {
    message: String,
    userId: Number,
    recipientId: Number
  },
  { versionKey: false }
)

const Message = model('Message', messageSchema)

module.exports = Message
