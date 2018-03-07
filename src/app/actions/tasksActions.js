import axios from 'axios';
import * as types from './actionTypes';

export function loadTasks(parentId) {
  return (dispatch) => {
    dispatch(loadTasksRequested());
    return axios.get(`/tasks/?parent_id=${parentId || ''}`).then(
      tasks => dispatch(loadTasksSuccess(tasks.data)),
      error => dispatch(loadTasksError(error.message))
    );
  };
}

export function loadTasksSuccess(tasks) {
  return { type: types.LOAD_TASKS_SUCCESS, tasks };
}

export function loadTasksRequested() {
  return { type: types.LOAD_TASKS_REQUESTED };
}

export function loadTasksError(error) {
  return { type: types.LOAD_TASKS_ERROR, error };
}

export function setCurrentView(crumb) {
  return { type: types.SET_CURRENT_VIEW, crumb };
}
