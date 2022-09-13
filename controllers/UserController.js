const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError, UnauthenticatedError } = require('../errors')


const follow = async (req, res) => {

}

const getFollowers = async (req, res) => {
    
}

const getFollowing = async (req, res) => {
    
}

module.exports = {
    follow,
    getFollowers,
    getFollowing
}