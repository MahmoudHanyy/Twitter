const mongoose = require('mongoose')

const tweetSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Please provide company name'],
      maxlength: 280,
    },
    userID: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
    likes:[{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [false, 'Please provide user'],
      }],
  },
  { timestamps: true }
)

module.exports = mongoose.model('tweet', tweetSchema)
