const mongoose = require('mongoose')

const TweetSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Please provide company name'],
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
  },
  { timestamps: true }
)

module.exports = mongoose.model('Tweet', TweetSchema)
