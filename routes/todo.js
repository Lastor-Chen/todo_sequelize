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
  res.send('GET new')
})

router.post('/new', (req, res) => {
  res.send('POST new')
})

// Read
router.get('/:id', (req, res) => {
  res.send('GET detail')
})

// Update
router.get('/:id/edit', (req, res) => {
  res.send('GET edit')
})

router.put('/:id/edit', (req, res) => {
  res.send('PUT edit')
})

// Delete
router.delete('/:id/delete', (req, res) => {
  res.send('DELETE todo')
})


// export
// ============================

module.exports = router