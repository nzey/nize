/* eslint-disable no-undef, no-unused-expressions */
import { renderComponent, expect } from '../../test_helper';
import Card from '../../../src/app/components/common/card/Card';

describe('Card', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(Card);
  });

  it('renders something', () => {
    expect(component).to.exist;
  });
});
