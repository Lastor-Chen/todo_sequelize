// routes home.js

// import package
// ==============================

const express = require('express')
const router = express.Router()

// sequelize Model
const db = require('../models')
const Todo = db.Todo


// routes '/'
// ==============================

router.get('/', (req, res) => {
  res.redirect('/index')
})

router.get('/index', (req, res) => {
  Todo.findByPk(req.user.dataValues.id)
    .then(todos => {
      res.render('index', { todos })
    })
    .catch(err => console.error(err))
})


// export
// ==============================

module.exports = router