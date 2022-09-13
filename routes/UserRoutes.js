const express = require('express')
const router = express.Router()

const {
    follow,
    getFollowers,
    getFollowing
  } = require('../controllers/UserController')
  
  router.route('/following')
    .post(follow)
    .get(getFollowing)

  router.route('/followers')
    .get(getFollowers)

module.exports = router