import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function BreadcrumbReducer(state = initialState.crumbs, action) {
  switch (action.type) {
    case types.SET_CURRENT_VIEW:
      for (let i = 0; i < state.length; i++) {
        if (action.crumb.id === state[i].id) {
          return state.slice(0, i + 1);
        }
      }
      return [...state, action.crumb];
    default:
      return state;
  }
}
