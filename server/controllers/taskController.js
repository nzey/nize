const db = require('../models/index.js');
const Task = db.task;
const taskHelper = require('../helpers/taskHelper.js');
const Dependency = db.dependency;

module.exports = (req, res, next) => {
  switch (req.method) {
    case 'GET':
      taskHelper.retrieveAllTasks(req.query.parent_id || null)
      .then(tasks => res.send(tasks))
      .catch(err => next(err));
      break;
    case 'POST':
      taskHelper.addTask(req.body)
      .then(createdTask => res.send(createdTask))
      .catch(err => next(err));
      break;
    case 'PUT':
      const { id, ...attributes } = req.body;
      taskHelper.updateTask(id, attributes)
      .then(updatedTask => res.send(`updated task: ${JSON.stringify(updatedTask)}`))
      .catch(err => next(err));
      break;
    case 'PATCH':
      taskHelper.deleteTasks(req.body.ids)
      .then(numDeleted => res.send(`Destroyed ${numDeleted} tasks plus their dependent tasks.`))
      .catch(err => next(err));
      break;
    default:
      break;
  }
};
