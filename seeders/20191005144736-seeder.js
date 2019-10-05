'use strict';

const users = require('./users.json')
const todos = require('./todos.json')
const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 載入 users
    users.forEach(user => {
      user.password = bcrypt.hashSync(user.password, 10)
    })

    await queryInterface.bulkInsert('Users', users)
    const userTable = await queryInterface.sequelize.query('SELECT id from users;')
    const userRows = userTable[0]

    // 載入 todos
    todos.forEach(todo => {
      if (todo.UserId === 0) todo.UserId = userRows[0].id
      if (todo.UserId === 1) todo.UserId = userRows[1].id
    })

    return await queryInterface.bulkInsert('todos', todos)
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('Users', null),
      queryInterface.bulkDelete('Todos', null),
    ]) 
  }
};
