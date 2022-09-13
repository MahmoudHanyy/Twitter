const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError, UnauthenticatedError } = require('../errors')


const follow = async (req, res) => {
    const userId = req.user.userId
    const user = await User.findOne({_id: userId})
    const personToFollow = await User.findOne({_id: req.body.userId})

    if (!user || !personToFollow || user._id === personToFollow._id){
        throw new NotFoundError('Something is not right!')
    }

    user.following.push(personToFollow._id)
    personToFollow.followers.push(user._id)

    user.save()
    personToFollow.save()

    res.status(StatusCodes.OK).json({user: user, followee: personToFollow})
}

const getFollowers = async (req, res) => {
    const userId = req.user.userId
    const user = await User.findOne({_id: userId})

    if (!user ){
        throw new NotFoundError('Something is not right!')
    }

    res.status(StatusCodes.OK).json({follwers: user.followers})
}

const getFollowing = async (req, res) => {
    const userId = req.user.userId
    const user = await User.findOne({_id: userId})

    if (!user ){
        throw new NotFoundError('Something is not right!')
    }

    res.status(StatusCodes.OK).json({following: user.following})
    
}

module.exports = {
    follow,
    getFollowers,
    getFollowing
}