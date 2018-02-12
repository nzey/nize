export default function TasksReducer(state = [], action) {
  let newState = state;
  switch (action.type) {
    case 'LOAD_TASKS':
      newState = action.tasks;
      break;
    case 'MOVE_CARD':
      for (let i = 0; i < newState.length; i++) {
        if (newState[i].id === action.id) {
          newState[i].position = `[${action.left}, ${action.top}]`;
          break;
        }
      }
      break;
    default:
      newState = [];
  }
  return newState;
}
