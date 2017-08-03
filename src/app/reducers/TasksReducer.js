export default function TasksReducer(state = [], action) {
  console.log('Task reducer called with action type: ', action.type)
  console.log('previous state: ', state)
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
    console.log('new state: ', newState)
    console.log(`Reducer told to move item ${action.id} to [${action.left}, ${action.top}]`);
    // newState = newState.slice(0, 4);
    break;
  default:
    newState = [];
  }
  return newState;
}
