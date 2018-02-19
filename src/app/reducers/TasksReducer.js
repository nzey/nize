import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function TasksReducer(state = initialState.tasks, action) {
  const newState = state;

  switch (action.type) {
    case types.LOAD_TASKS_SUCCESS:
      return action.tasks;
    case types.MOVE_CARD:
      for (let i = 0; i < newState.length; i++) {
        if (newState[i].id === action.id) {
          newState[i].position = `[${action.left}, ${action.top}]`;
          break;
        }
      }
      return newState;
    default:
      return state;
  }
}
