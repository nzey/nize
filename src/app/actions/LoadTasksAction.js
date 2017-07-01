export default function (tasksArr) {
  console.log(`loadTasks action called with ${JSON.stringify(tasksArr)}`);
  return {
    type: 'LOAD_TASKS',
    tasks: tasksArr,
  };
}
