const express = require('express')

const router = express.Router()
const {
  createTweet,
  deleteTweet,
  getAllTweets,
  getTweet,
  likeTweet,
} = require('../controllers/TweetController')

router.route('/')
  .post(createTweet)
  .get(getAllTweets)
router.route('/:id')
  .get(getTweet)
  .delete(deleteTweet)
router.route('/like')
  .post(likeTweet)

module.exports = router
