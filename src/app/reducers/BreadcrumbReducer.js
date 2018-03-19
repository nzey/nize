import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function BreadcrumbReducer(state = initialState.get('crumbs'), action) {
  if (action.type === types.SET_CURRENT_VIEW) {
    const crumbIndex = state.findIndex(crumb => crumb.get('id') === action.crumb.get('id'));
    if (crumbIndex > -1) {
      return state.slice(0, crumbIndex + 1);
    }
    return state.push(action.crumb);
  }
  return state;
}
