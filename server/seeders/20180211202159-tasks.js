'use strict';

const faker = require('faker');
const Sequelize = require('sequelize');
const rand5 = require('../../helpers/numbers').rand5;

const mockTask = () => {
  return {
    title: faker.lorem.words(),
    estimatedTime: rand5(1, 480),
    estimateConfidence: 70,
    createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
  };
};

const mockTasks = (times) => Array(times).fill({}, 0, times).map(() => mockTask());

module.exports = {
  up: function (queryInterface) {
    return queryInterface.bulkInsert('Tasks', mockTasks(20), {});
  },

  down: function (queryInterface) {
    return queryInterface.bulkDelete('Tasks', null, {});
  },
};
