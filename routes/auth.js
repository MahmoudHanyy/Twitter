const express = require('express')
const router = express.Router()
// import route handlers from controller 
const {login, register} = require('../controllers/auth')

router.post('/register', register) 
router.post('/login', login) 

module.exports = router