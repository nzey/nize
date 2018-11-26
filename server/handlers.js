const db = require('./models/index.js');
const Task = db.task;
const Op = db.Sequelize.Op;

const taskHandler = (req, res, next) => {
  switch (req.method) {
    case 'GET':
      const parentId = req.query.parent_id ? req.query.parent_id : null;
      Task.findAll({ where: { parentId } })
      .then(tasks => res.send(tasks))
      .catch(err => next(err));
      break;
    case 'POST':
      Task.create(req.body)
      .then(createdTask => res.send(createdTask))
      .catch(err => next(err));
      break;
    case 'PUT':
      // TODO: Use secure operators (e.g.Task.findById({ [Op.eq]: req.body.id })
      // https://github.com/sequelize/sequelize/issues/8417#issuecomment-334056048
      Task.findById(req.body.id)
      .then(foundTask => { 
        const updateableFields = Object.assign({}, req.body);
        delete updateableFields.id;
        foundTask.update(updateableFields);
      })
      .then(updatedTask => res.send(`updated task: ${JSON.stringify(updatedTask)}`))
      .catch(err => next(err));
      break;
    case 'PATCH':
      Task.findAll({ where: { id: { [Op.in]: req.body.ids } } })
      .then(tasks => { 
        tasks.forEach(task => task.destroy());
        return tasks.length;
      })
      .then(numDeleted => res.send(`Destroyed ${numDeleted} tasks plus their dependent tasks.`))
      .catch(err => next(err));
      break;
    default:
      break;
  }
};


module.exports = {
  taskHandler,
  Task,
};
