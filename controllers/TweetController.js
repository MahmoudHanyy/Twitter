const Tweet = require('../models/Tweet')
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllTweets = async (req, res) => {
  const tweets = await Tweet.find({ userId: req.user.userId }).sort('createdAt')
  res.status(StatusCodes.OK).json({ tweets, count: tweets.length })
}
const getTweet = async (req, res) => {
  const {
    user: { userId },
    params: { id: tweetId },
  } = req

  const tweet = await Tweet.findOne({
    _id: tweetId,
    userId: userId,
  })
  if (!tweet) {
    throw new NotFoundError(`No tweet with id ${tweetId}`)
  }
  res.status(StatusCodes.OK).json({ tweet })
}

const createTweet = async (req, res) => {
  req.body.userId = req.user.userId
  const createdTweet = await Tweet.create(req.body)
  res.status(StatusCodes.CREATED).json({ createdTweet })
}

const deleteTweet = async (req, res) => {
  const {
    user: { userId },
    params: { id: tweetId },
  } = req

  const tweet = await Tweet.findByIdAndRemove({
    _id: tweetId,
    userId: userId,
  })
  if (!tweet) {
    throw new NotFoundError(`No tweet with id ${tweetId}`)
  }
  res.status(StatusCodes.OK).send()
}

const like = async (req, res) => {
  const userId = req.user.userId
  const tweet = await Tweet.findOne({_id: req.body.tweetId})
  const user = await User.findOne({_id: userId})
  const like = await Tweet.findOne({'likes': userId})

tweet
  if (!user || !tweet ){
      throw new NotFoundError('Something went wrong')
  }
  else if (like != null)
  {
    tweet.likes.pull(user._id)
  }
  else{
    tweet.likes.push(user._id)
  }
  tweet.save()
  res.status(StatusCodes.OK).json({ tweet})
}

module.exports = {
  createTweet,
  deleteTweet,
  getAllTweets,
  getTweet,
  like,
  // getAllLikes,
  // unlike,
}
