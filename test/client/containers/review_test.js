/* eslint-disable no-undef, no-unused-expressions */
import { renderComponent, expect } from '../../test_helper';
import Review from '../../../src/app/containers/review/Review';

describe('Review', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(Review);
  });

  it('renders something', () => {
    expect(component).to.exist;
  });
});
