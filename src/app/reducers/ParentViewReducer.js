import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function ParentViewReducer(state = initialState.parents, action) {
  switch (action.type) {
    case types.SET_CURRENT_VIEW:
      for (let i = 0; i < state.length; i++) {
        if (action.parentId === state[i]) {
          return state.slice(0, i + 1);
        }
      }
      return [...state, action.parentId];
    default:
      return state;
  }
}
