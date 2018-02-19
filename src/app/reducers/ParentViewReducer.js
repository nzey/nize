import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function ParentViewReducer(state = initialState.parent, action) {
  switch (action.type) {
    case types.SET_CURRENT_VIEW:
      return action.parentId;
    default:
      return state;
  }
}
