const db = require('../models/index.js');
const Task = db.task;
const Dependency = db.dependency;
const Op = db.Sequelize.Op;

module.exports = (req, res, next) => {
  switch (req.method) {
    case 'GET':
      const parentId = req.query.parent_id ? req.query.parent_id : null;
      Task.findAll({
        where: { parentId },
        include: {
          model: Dependency,
          as: 'dependencies',
          attributes: ['taskId'],
        },
      })
      .then(tasks => {
        const formattedTasks = tasks.map(task => {
          const depTaskIds = { dependencies: task.dependencies.map(dep => dep.taskId) };
          return Object.assign(task.get({ plain: true }), depTaskIds);
        });
        res.send(formattedTasks);
      })
      .catch(err => next(err));
      break;
    case 'POST':
      // TODO: Add prereq field for each task
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
