/* eslint-disable no-undef, no-unused-expressions */
import { renderComponent, expect } from '../../test_helper';
import Now from '../../../src/app/containers/now/Now';

describe('Now', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(Now);
  });

  it('renders something', () => {
    expect(component).to.exist;
  });
});
