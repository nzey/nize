import { fromJS } from 'immutable';

export default fromJS({
  plan: {
    tasks: [],
    isFetching: false,
    error: null,
  },
  crumbs: [{ id: null, title: 'Top Level Tasks' }],
});
