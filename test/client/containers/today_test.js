/* eslint-disable no-undef, no-unused-expressions */
import { renderComponent, expect } from '../../test_helper';
import Today from '../../../src/app/containers/today/Today';

describe('Today', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(Today);
  });

  it('renders something', () => {
    expect(component).to.exist;
  });
});
