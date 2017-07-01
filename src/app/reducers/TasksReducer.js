export default function TasksReducer(state = [], action) {
  let newState = state;
  switch (action.type) {
  case 'LOAD_TASKS':
    newState = action.tasks;
    break;
  default:
    newState = [];
  }
  return newState;
}
