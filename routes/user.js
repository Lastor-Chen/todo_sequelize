// routes user.js

// import package
// ==============================

const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')

// sequelize Model
const db = require('../models')
const User = db.User


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
  User
    .create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    .then(user => res.redirect('/'))
})

router.get('/signout', (req, res) => {
  res.send('GET sign out')
})


// export
// ==============================

module.exports = router