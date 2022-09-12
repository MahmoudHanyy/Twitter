const tweet = require('../models/tweet')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllTweets = async (req, res) => {
  const tweets = await tweet.find({ userID: req.user.userId }).sort('createdAt')
  res.status(StatusCodes.OK).json({ tweets, count: tweets.length })
}
const getTweet = async (req, res) => {
  const {
    user: { userId },
    params: { id: tweetId },
  } = req

  const tweet = await tweet.findOne({
    _id: tweetId,
    userID: userId,
  })
  if (!tweet) {
    throw new NotFoundError(`No tweet with id ${tweetId}`)
  }
  res.status(StatusCodes.OK).json({ tweet })
}

const createTweet = async (req, res) => {
  req.body.userID = req.user.userId
  const tweet = await tweet.create(req.body)
  res.status(StatusCodes.CREATED).json({ tweet })
}

const deleteTweet = async (req, res) => {
  const {
    user: { userId },
    params: { id: tweetId },
  } = req

  const tweet = await tweet.findByIdAndRemove({
    _id: tweetId,
    userID: userId,
  })
  if (!tweet) {
    throw new NotFoundError(`No tweet with id ${tweetId}`)
  }
  res.status(StatusCodes.OK).send()
}

module.exports = {
  createTweet,
  deleteTweet,
  getAllTweets,
  getTweet,
}
