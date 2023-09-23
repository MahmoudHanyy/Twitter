const { string } = require('joi')
const mongoose = require('mongoose')

const TweetSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Please provide tweet content'],
      maxlength: 280,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
    likes:[{
        type: mongoose.Types.ObjectId,
        ref: 'User',
      }],
      sentFrom: {
        type: String,
        maxlength: 100,
      },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Tweet', TweetSchema)
