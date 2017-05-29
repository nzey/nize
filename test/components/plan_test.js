/* eslint-disable no-undef, no-unused-expressions */
import { renderComponent, expect } from '../test_helper';
import Plan from '../../src/app/components/plan/Plan';

describe('Plan', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(Plan);
  });

  it('renders something', () => {
    expect(component).to.exist;
  });
});
