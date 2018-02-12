'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn('Tasks', 'estimatedTime', { // in minutes
      type: 'INTEGER USING CAST("estimatedTime" as INTEGER)',
      allowNull: false,
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn('Tasks', 'estimatedTime', { // e.g. "00:15"
      type: Sequelize.STRING,
      allowNull: false,
    })  
  }
}
