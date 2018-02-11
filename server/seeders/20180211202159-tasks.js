'use strict';

const faker = require('faker');
const Sequelize = require('sequelize');

const mockTask = () => {
  return {
    title: faker.lorem.words(), 
    estimatedTime: "00:15", 
    estimateConfidence: 70,
    createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
  }
}

const mockTasks = (times) => Array(times).fill({}, 0, times).map(() => mockTask())

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Tasks', mockTasks(20), {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Tasks', null, {});
  }
};
