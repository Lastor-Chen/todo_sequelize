// routes user.js

// import package
// ==============================

const express = require('express')
const router = express.Router()
const passport = require('passport')
// const User = require('../models/user.js')
const bcrypt = require('bcryptjs')


// routes '/users'
// ==============================

router.get('/signin', (req, res) => {
  res.render('signin')
})

router.post('/signin', (req, res) => {
  res.send('POST sign in')
})

router.get('/signup', (req, res) => {
  res.render('signup')
})

router.post('/signup', (req, res) => {
  res.send('POST sign up')
})

router.get('/signout', (req, res) => {
  res.send('GET sign out')
})


// export
// ==============================

module.exports = router