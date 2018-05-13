import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function TasksReducer(state = initialState.get('plan'), action) {
  switch (action.type) {
    case types.LOAD_TASKS_SUCCESS:
      return state.merge({ tasks: action.tasks, isFetching: false });
    case types.LOAD_TASKS_REQUESTED:
      return state.set('isFetching', true);
    case types.LOAD_TASKS_ERROR:
      return state.merge({ error: action.error, isFetching: false });
    case types.MOVE_CARD: // TODO: this should be in its own reducer for one task/
      for (let i = 0; i < state.get('tasks').size; i++) {
        if (state.getIn(['tasks', i, 'id']) === action.id) {
          return state.setIn(['tasks', i, 'position'], `[${action.left}, ${action.top}]`);
        }
      }
      return state;
    default:
      return state;
  }
}
