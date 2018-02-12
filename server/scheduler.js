import { Task } from '../server/models/index';

// returns object: { scheduled: objectOfTaskObjectsKeyedByStartTime, other: arrayOfTaskObjects }
const buildDayAgenda = (minutes, startTime, buffers = 15) => {
  
  // scheduled tasks are anything with specific time (recurrant or not), [{ taskId, startTime, estimatedTime }]
  const tasks = { scheduled: Task.scheduled(startTime, minutes), other: [] };

  const timeblocks = createTimeblocks(tasks[scheduled], startTime, minutes); // minutes between scheduled activities [50, 130, 45, 180, 15]
  
  // Pools of prioritized tasks to pull from first
  const urgentUnassigned = Task.urgent(startTime) 
  const recurringUnassigned = Task.recurringToday(startTime); // recurring without specific time, when scheduled or recurring task is created to conflict, warn that one task must be moved before saving
  const startedToday = {}; // { [id]: timeLeftBasedOnEstimatedTime}

  timeBlocks.forEach((block, i) => {
    timeLeftInBlock = buffer(block, buffers);
    // TODO check if i is last before indexing, also calculate once, then subtract each time block is completed, instead of calculating each time
    remainingTime = timeBlocks[i + 1].reduce((sum, min) => sum + buffer(min, buffers));
    while (timeLeftInBlock > 5) {
      let nextTask = findNext(timeLeftInBlock, remainingTime, urgent, recurring);
      tasks.other.push(nextTask);
      // remove task from urgent or recurring object (keyed by task id)
      // if started but not enough time in this block, add to startedToday
    }
  });
};

// return a task based on priorities and time allotted
const findNext = (minutes) => {};

// return array of integers representing blocks of time
const createTimeblocks = (scheduleTasks, startTime, minutes) => {};

// Factor in transation and break time
const buffer = (totalMin, bufferMin) => {
  // If total min is above threshold return totalMin - (bufferMin * factorProportionalToTotal)
};

module.exports = {
  buildAgenda,
};
