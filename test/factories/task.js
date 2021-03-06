import faker from 'faker';
import { factory } from 'factory-girl';
import { Task } from '../../server/models/index';
import { rand5 } from '../../helpers/numbers';

factory.define('task', Task, {
  id: factory.sequence('Product.id', (n) => `product_${n}`),
  title: faker.lorem.words(),
  estimatedTime: rand5(1, 480),
});

export default factory;
