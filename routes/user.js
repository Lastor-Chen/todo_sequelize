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
  res.render('signin', { css: 'sign' })
})

router.post('/signin', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/users/signin'
  })(req, res, next)
})

router.get('/signup', (req, res) => {
  res.render('signup')
})

router.post('/signup', (req, res) => {
  const { name, email, password, password2 } = req.body
  
  User
    .findOne({ where: { email: email } })
    .then(user => {
      if (user) {
        res.render('signup', { name, email, password, password2 })
      } else {
        const newUser = new User({ name, email, password })

        newUser.save()
          .then(user => res.redirect('/'))
      }
    })
    .catch(err => console.error(err))
})

router.get('/signout', (req, res) => {
  res.send('GET sign out')
})


// export
// ==============================

module.exports = router