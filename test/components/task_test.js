/* eslint-disable no-undef, no-unused-expressions */
import { renderComponent, expect } from '../test_helper';
import Task from '../../src/app/components/common/task/Task';

describe('Task', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(Task);
  });

  it('renders something', () => {
    expect(component).to.exist;
  });
});
