import faker from 'faker';
import { factory } from 'factory-girl';
import { Task } from '../../server/models/index'
import { rand_5 } from '../../helpers/numbers'

factory.define('task', Task, {
  id: factory.sequence('Product.id', (n) => `product_${n}`),
  title: faker.lorem.words(), 
  estimatedTime: rand_5(1, 480), 
  estimateConfidence: 70
});

export default factory
