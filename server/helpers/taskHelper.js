const _ = require('lodash');
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

const addTask = (attributes) => {
  const { dependencies, ...taskAttributes } = attributes;
  taskAttributes.dependencies = (dependencies || []).map(taskId => Object.assign({}, { taskId }));
  return Task.create(taskAttributes, { include: [{ model: Dependency, as: 'dependencies' }]});
};

const taskWithDependencies = (id) => Task.findById(id, { include: [{ model: Dependency, as: 'dependencies' }] })

// TODO: Use secure operators (e.g.Task.findById({ [Op.eq]: req.body.id })
// https://github.com/sequelize/sequelize/issues/8417#issuecomment-334056048
const updateTask = (id, updatedAttributes) => {
  const { dependencies, ...taskAttributes } = updatedAttributes
  return taskWithDependencies(id).then(task => {
        const existingDeps = task.dependencies.map(dep => dep.taskId);
        const depsToDelete = _.difference(existingDeps, dependencies)
        const depsToAdd = _.difference(dependencies, existingDeps).map(taskId => Object.assign({}, { dependentTaskId: id, taskId }));
        return Dependency.bulkCreate(depsToAdd)
                  .then(addedDeps => Dependency.destroy({ where: { taskId: depsToDelete, dependentTaskId: id } }))
                  .then(deletedDepts => taskWithDependencies(id))
                  .then(taskWithDeps => taskWithDeps.update(taskAttributes)) 
      });
};

const deleteTasks = (ids) => Task.destroy({ where: { id: { [Op.in]: ids } } }).then(tasks => tasks.length);

module.exports = {
  retrieveAllTasks,
  addTask,
  updateTask,
  deleteTasks,
};
