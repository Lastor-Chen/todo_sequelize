'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Users', 'email', {
        type: Sequelize.STRING,
        allowNull: false
      }),
      queryInterface.changeColumn('Users', 'password', {
        type: Sequelize.STRING,
        allowNull: false
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Users', 'email', {
        type: Sequelize.STRING,
      }),
      queryInterface.changeColumn('Users', 'password', {
        type: Sequelize.STRING,
      })
    ])
  }
};
