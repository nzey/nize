'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: Sequelize.STRING,
      typeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Types',
          key: 'id',
          as: 'typeId',
        },
      },
      resourceId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Resources',
          key: 'id',
          as: 'resourceId',
        },
      },
      notes: Sequelize.STRING,
      estimatedTime: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      estimateConfidence: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      actualTime: Sequelize.FLOAT,
      dateStarted: Sequelize.DATE,
      dateCompleted: Sequelize.DATE,
      deadline: Sequelize.DATE,
      specificTime: Sequelize.DATE,
      recurrence: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Tasks');
  },
};