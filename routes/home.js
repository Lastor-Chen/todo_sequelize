// routes home.js

// import package
// ==============================

const express = require('express')
const router = express.Router()

// sequelize Model
const db = require('../models')
const User = db.User
const Todo = db.Todo


// routes '/'
// ==============================

router.get('/', (req, res) => {
  res.redirect('/index')
})

router.get('/index', (req, res) => {
  // 登入成功時，洗掉 sign in 表單輸入保留值
  req.flash('email')

  Todo.findAll({
    where: { UserId: req.user.id }, 
    order: [ ['done', 'ASC'] ] 
  })
    .then(todos => res.render('index', { js: 'index', todos }) )
    .catch(err => res.status(422).json(err) )
})


// export
// ==============================

module.exports = router