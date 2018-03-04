import axios from 'axios';
import * as types from './actionTypes';  

export function loadTasks(parentId) {
  return (dispatch) => {
    return axios.get(`/tasks/?parent_id=${parentId || ''}`).then(tasks => {
      dispatch(loadTasksSuccess(tasks.data));
    }).catch(error => {
      throw error;
    });
  };
}

export function loadTasksSuccess(tasks) {  
  return { type: types.LOAD_TASKS_SUCCESS, tasks };
}

export function setCurrentView(crumb) {
  return { type: types.SET_CURRENT_VIEW, crumb };
}
