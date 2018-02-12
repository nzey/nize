'use strict';

const faker = require('faker');
const Sequelize = require('sequelize');
const rand_5 = require('../../helpers/numbers').rand_5

const mockTask = () => {
  return {
    title: faker.lorem.words(), 
    estimatedTime: rand_5(1, 480), 
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
