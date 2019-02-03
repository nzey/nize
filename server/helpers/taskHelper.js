const db = require('../models/index.js');
const Op = db.Sequelize.Op;
const Task = db.task;
const Dependency = db.dependency;

const appendDependencies = (task) => {
  const depTaskIds = { dependencies: task.dependencies.map(dep => dep.taskId) };
  return Object.assign(task.get({ plain: true }), depTaskIds);
};

const retrieveAllTasks = (parentId = null) => Task.findAll({
  where: { parentId },
  include: {
    model: Dependency,
    as: 'dependencies',
    attributes: ['taskId'],
  },
}).then(tasks => tasks.map(task => appendDependencies(task)));

// TODO: Handle 'prerequesites/dendencies' attribute
const addTask = (attributes) => Task.create(attributes);

// TODO: Use secure operators (e.g.Task.findById({ [Op.eq]: req.body.id })
// https://github.com/sequelize/sequelize/issues/8417#issuecomment-334056048
const updateTask = (id, updatedAttributes) =>
  Task.findById(id).then(task => task.update(updatedAttributes));

const deleteTasks = (ids) => Task.findAll({ where: { id: { [Op.in]: ids } } })
  .then(tasks => {
    tasks.forEach(task => task.destroy());
    return tasks.length;
  });

module.exports = {
  retrieveAllTasks,
  addTask,
  updateTask,
  deleteTasks,
};
