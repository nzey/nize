const faker = require('faker');

const rand_5 = (min, max) => {
  return Math.floor(faker.random.number({ min: min, max: max }) / 5) * 5
}

module.exports = { rand_5 }