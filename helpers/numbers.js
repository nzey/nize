const faker = require('faker');

const rand5 = (min, max) =>
  Math.floor(faker.random.number({ min, max }) / 5) * 5;

module.exports = { rand5 };
