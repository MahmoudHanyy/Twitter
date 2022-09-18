const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError, UnauthenticatedError } = require('../errors')

const login = async (req, res) => {
    if (!req.body.email || !req.body.password){
        throw new BadRequestError('Bad Credentials!')
    }
    const user = await User.findOne({email: req.body.email})
    if (!user) {
        throw new NotFoundError('This email does not exist :(')
    }
    isPasswordCorrect = await user.comparePassword(req.body.password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Wrong Credentials')
    }
    const{password, ...userData }= user._doc
    token = await user.createJWT()
    res.status(StatusCodes.OK).json({ user:userData, token })
}

const register = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password){
        throw new BadRequestError('Missing information, please make sure you fill all data required!')
    }
    const user = await User.create(req.body)
    console.log(user)
    token = user.createJWT()
    console.log(token)
    const{password, ...createdUser }= user._doc
    res.status(StatusCodes.CREATED).json({ user:createdUser, token })
}

module.exports = {
    login,
    register
}