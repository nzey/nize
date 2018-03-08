/* eslint-disable no-undef, no-unused-expressions */
import { renderComponent, expect, wrapInTestContext } from '../../test_helper';
import Plan from '../../../src/app/containers/plan/Plan';
import { compose } from 'redux';

describe('Plan', () => {
  let component;

  beforeEach(() => {
    component = compose(renderComponent, wrapInTestContext)(Plan);
  });

  it('renders something', () => {
    expect(component).to.exist;
  });
});
