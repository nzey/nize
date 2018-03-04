const faker = require('faker');
const Sequelize = require('sequelize');
const rand5 = require('../../helpers/numbers').rand5;
const Task = require('../models/index').Task;

const mockTask = () => {
  return {
    title: faker.lorem.words(),
    estimatedTime: rand5(1, 480),
    createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
  };
};

const mockTasks = (times) => Array(times).fill({}, 0, times).map(() => mockTask());

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Tasks', mockTasks(20), {})
    .then(() => Task.findAll({ limit: 5 }).then(tasks => tasks[0].setChildren(tasks.slice(1))));
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Tasks', null, {});
  },
};
