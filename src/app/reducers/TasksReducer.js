import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function TasksReducer(state = initialState.plan, action) {
  switch (action.type) {
    case types.LOAD_TASKS_SUCCESS:
      return Object.assign({}, state, { tasks: action.tasks, isFetching: false });
    case types.LOAD_TASKS_REQUESTED:
      return Object.assign({}, state, { isFetching: true });
    case types.LOAD_TASKS_ERROR:
      return Object.assign({}, state, { tasks: action.error, isFetching: false });
    case types.MOVE_CARD: // TODO: this should be in its own reducer for one task/card
      for (let i = 0; i < state.tasks.length; i++) {
        if (state.tasks[i].id === action.id) {
          const newTasks = [...state.tasks];
          newTasks[i].position = `[${action.left}, ${action.top}]`;
          return Object.assign({}, state, { tasks: newTasks });
        }
      }
      return state;
    default:
      return state;
  }
}
