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

// custom module
const { checkSignUp } = require('../lib/formChecker.js') 

// routes '/users'
// ==============================

// 登入
router.get('/signin', (req, res) => {
  // sign in 表單保留輸入值
  const email = req.flash('email')

  res.render('signin', { css: 'sign', signin: 'signin', email })
})

router.post('/signin', (req, res, next) => {
  // sign in 表單保留輸入值
  req.flash('email', req.body.email)

  passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/users/signin',
    badRequestMessage: '請輸入 Email 與 Password',
    failureFlash: true
  })(req, res, next)
})

// 註冊
router.get('/signup', (req, res) => {
  res.render('signup', { css: 'sign' })
})

router.post('/signup', async (req, res) => {
  const input = req.body
  
  // 檢查表單
  const error = await checkSignUp(input) || []
  if (error.length) return res.render('signup', { css: 'sign', input, error })

  // 註冊帳戶
  const slat = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(input.password, slat)
  input.password = hash

  try {
    await User.create(input)
    res.redirect('signin')
  } catch (err) {
    res.status(422).json(err)
  }
})

// 登出
router.get('/signout', (req, res) => {
  req.logout()
  req.flash('success', '已成功登出')
  res.redirect('/users/signin')
})


// export
// ==============================

module.exports = router