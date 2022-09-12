const express = require('express')

const router = express.Router()
const {
  createTweet,
  deleteTweet,
  getAllTweets,
  getTweet,
} = require('../controllers/tweet')

router.route('/').post(createTweet).get(getAllTweets)

router.route('/:id').get(getTweet).delete(deleteTweet)

module.exports = router
