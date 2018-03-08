/* eslint-disable no-undef, no-unused-expressions */
import { renderComponent, expect, wrapInTestContext, factory } from '../../test_helper';
import Card from '../../../src/app/components/common/card/Card';

describe('Card', () => {
  let task;
  let dndWrappedCard;
  let reduxWrappedCard;

  beforeEach(async () => {
    task = await factory.build('task');
    dndWrappedCard = wrapInTestContext(Card);
    reduxWrappedCard = renderComponent(dndWrappedCard, { task, handleClick: () => {} });
  })

  it('renders something', () => {
    expect(reduxWrappedCard).to.exist;
  });
});
