import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  message: String,
  userId: Number,
  recipientId: Number
});

const Message = mongoose.model("Message", messageSchema);

export default Message;