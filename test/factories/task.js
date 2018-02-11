import faker from 'faker';
import { factory } from 'factory-girl';
import { Task } from '../../server/models/index.js';

factory.define('task', Task, {
  id: factory.sequence('Product.id', (n) => `product_${n}`),
  title: faker.lorem.words(), 
  estimatedTime: "00:15", 
  estimateConfidence: 70
});

export default factory
