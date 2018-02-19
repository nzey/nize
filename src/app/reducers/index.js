import { combineReducers } from 'redux';
import TasksReducer from './TasksReducer.js';
import ParentViewReducer from './ParentViewReducer.js';

const rootReducer = combineReducers({
  state: (state = {}) => state,
  tasks: TasksReducer,
  parent: ParentViewReducer,
});

export default rootReducer;
