import { combineReducers } from 'redux';
import TasksReducer from './TasksReducer.js';

const rootReducer = combineReducers({
  state: (state = {}) => state,
  allTasks: TasksReducer,
});

export default rootReducer;
