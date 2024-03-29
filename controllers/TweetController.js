const Tweet = require('../models/Tweet')
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const TweetResource = require('../resources/TweetResource')

const getAllTweets = async (req, res) => {
  const tweets = await Tweet.find({ userId: req.user.userId }).sort('createdAt')
  const tweetCollection = TweetResource.collection(tweets);
  res.status(StatusCodes.OK).json(tweetCollection)
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

const likeTweet = async (req, res) => {
  const userId = req.user.userId
  const tweet = await Tweet.findOne({_id: req.body.tweetId})
  const user = await User.findOne({_id: userId})
  const like = await Tweet.findOne({'likes': userId})

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
  likeTweet,
}
