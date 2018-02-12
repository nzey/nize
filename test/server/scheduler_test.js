/* eslint-disable no-undef, no-unused-expressions */
import { buildAgenda } from '../../server/scheduler';
import chai, { expect } from 'chai';
import { factory } from '../test_helper';

describe('buildAgenda', () => {
  // TODO: Consider using lazy variables package, like 'let' in Rspec 
  // (https://medium.com/@sergiy.stotskiy/lazy-variables-with-mocha-js-d6063503104c)
  let tasks;

  before(async () => {
    const task1 = await factory.build('task')
    const task2 = await factory.build('task')
    const task3 = await factory.build('task')
    const task4 = await factory.build('task')
    tasks = [task1, task2, task3, task4]
  });

  it('Returns array of tasks', () => {
    expect(tasks).to.eql(buildAgenda(300, tasks));
  });
});
