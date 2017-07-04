const db = require('./models/index.js');
const Task = db.Task;

const taskHandler = (req, res) => {
  switch (req.method) {
  case 'GET':
    Task.findAll()
    .then(tasks => res.send(tasks))
    .catch(err => console.log('ERROR getting all tasks: ', err));
    break;
  case 'POST':
    Task.create(req.body)
    .then(createdTask => res.send(createdTask))
    .catch(err => console.log('ERROR POSTING: ', err));
    break;
  default:
    break;
  }
};

module.exports = {
  taskHandler,
};
