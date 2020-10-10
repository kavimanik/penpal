const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    username: String,
    password: String
  },
  { versionKey: false }
)

const User = model('User', userSchema)

module.exports = User
