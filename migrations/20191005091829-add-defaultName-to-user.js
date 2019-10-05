'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Users', 'name', {
      type: Sequelize.STRING,
      defaultValue: 'User'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Users', 'name', {
      type: Sequelize.STRING,
    })
  }
};
