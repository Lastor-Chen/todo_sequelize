// routes todo.js

// import package
// ==============================

const express = require('express')
const router = express.Router()

// sequelize Model
const db = require('../models')
const User = db.User
const Todo = db.Todo


// routes '/todos'
// ============================

// Create
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  Todo
    .create({
      name: req.body.name,
      UserId: req.user.id
    })
    .then(todo => res.redirect('/index'))
    .catch(err => res.status(422).json(err))
})

// Read
router.get('/:id', (req, res) => {
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) throw new Error('User not found')

      return Todo.findOne({ 
        where: {
          UserId: req.user.id,
          Id: req.params.id
        } 
      })
    })
    .then(todo => res.render('detail', { todo }) )
    .catch(err => res.status(422).json(err) )
})

// Update
router.get('/:id/edit', (req, res) => {
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) throw new Error('User not found')

      return Todo.findOne({
        where: {
          UserId: req.user.id,
          Id: req.params.id
        } 
      })
    })
    .then(todo => res.render('edit', { todo }) )
    .catch(err => res.status(422).json(err))
})

router.put('/:id/edit', (req, res) => {
  Todo.findOne({ 
    where: {
        UserId: req.user.id,
        Id: req.params.id
      }
  })
  .then(todo => {
    todo.name = req.body.name
    todo.done = (req.body.done === 'on')  // 轉布林
    return todo.save()
  })
  .then(todo => res.redirect(`/todos/${req.params.id}`))
  .catch(err => res.status(422).json(err) )
})

// Delete
router.delete('/:id/delete', (req, res) => {
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) throw new Error('User not found')

      return Todo.destroy({
        where: {
          UserId: req.user.id,
          Id: req.params.id
        }
      })
    })
    .then(todo => res.redirect('/index'))
    .catch(err => res.status(422).json(err) )
})


// export
// ============================

module.exports = router