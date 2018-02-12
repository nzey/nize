export default function (tasksArr) {
  return {
    type: 'LOAD_TASKS',
    tasks: tasksArr,
  };
}
