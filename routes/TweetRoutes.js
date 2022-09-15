const express = require('express')

const router = express.Router()
const {
  createTweet,
  deleteTweet,
  getAllTweets,
  getTweet,
  like,
} = require('../controllers/TweetController')

router.route('/').post(createTweet).get(getAllTweets)
router.route('/:id').get(getTweet).delete(deleteTweet)
router.route('/like').post(like)

module.exports = router
