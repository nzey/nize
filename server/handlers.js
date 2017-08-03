const db = require('./models/index.js');
const Task = db.Task;

const taskHandler = (req, res) => {
  switch (req.method) {
  case 'GET':
    Task.findAll()
    .then(tasks => res.send(tasks))
    .catch(err => res.send(`ERROR getting all tasks: ${err}`));
    break;
  case 'POST':
    Task.create(req.body)
    .then(createdTask => res.send(createdTask))
    .catch(err => res.send(`ERROR POSTING: ${err}`));
    break;
  case 'PUT':
    Task.findById(req.body.id)
    .then(foundTask => foundTask.update({ position: req.body.position }))
    .then(updatedTask => res.send(`updated task: ${JSON.stringify(updatedTask)}`))
    .catch(err => res.send(`ERROR updating task position: ${err}`));
    break;
  default:
    break;
  }
};

module.exports = {
  taskHandler,
};
