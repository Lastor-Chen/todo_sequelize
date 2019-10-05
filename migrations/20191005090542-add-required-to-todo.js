'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Todos', 'name', {
        type: Sequelize.STRING,
        allowNull: false
      }),
      queryInterface.changeColumn('Todos', 'done', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Todos', 'name', {
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn('Todos', 'done', {
        type: Sequelize.BOOLEAN
      })
    ])
  }
};
