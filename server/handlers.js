const db = require('./models/index.js');
const Task = db.Task;

module.exports.taskHandler = function taskHandler(req, res) {
  Task.findAll()
  .then(tasks => res.send(tasks));
};
