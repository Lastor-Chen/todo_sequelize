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
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) throw new Error('User not found')

      return Todo.findAll({ where: { UserId: req.user.id } })
    })
    .then(todos => {
      res.render('index', { todos })
    })
    .catch(err => res.status(422).json(err) )
})


// export
// ==============================

module.exports = router