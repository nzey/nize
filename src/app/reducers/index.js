import { combineReducers } from 'redux';
import TasksReducer from './TasksReducer.js';
import BreadcrumbReducer from './BreadcrumbReducer.js';

const rootReducer = combineReducers({
  state: (state = {}) => state,
  tasks: TasksReducer,
  crumbs: BreadcrumbReducer,
});

export default rootReducer;
