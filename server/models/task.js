const db = require('./index.js');
const Dependency = db.dependency;

module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: DataTypes.STRING,
    position: DataTypes.STRING, // e.g. "[0, 0]" or "[50, 100]"
    notes: DataTypes.STRING,
    estimatedTime: { // in minutes
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    actualTime: DataTypes.FLOAT,
    dateStarted: DataTypes.DATE,
    dateCompleted: DataTypes.DATE,
    deadline: DataTypes.DATE,
    specificTime: DataTypes.DATE, // if a task must be done at a specific time/date
    recurrence: DataTypes.STRING, // '#/[min, hr, wk, month, m, m-t, m-t-w, etc]'
  }, {
    scopes: {
      elders: { where: { parentId: null } },
    },
  });

  // Class Methods
  Task.associate = (models) => {
    // allows Task.setChildren(), task.getChildren()
    Task.hasMany(models.task, {
      foreignKey: 'parentId',
      as: 'children',
      onDelete: 'cascade',
      hooks: true,
    });
    Task.hasMany(models.dependency, {
      foreignKey: 'dependentTaskId',
      as: 'dependencies',
      onDelete: 'cascade',
      hooks: true,
    });
    Task.hasMany(models.dependency, {
      foreignKey: 'taskId',
      as: 'dependentTasks',
      onDelete: 'cascade',
      hooks: true,
    });
    Task.belongsTo(models.type);
    Task.belongsTo(models.resource);
    Task.belongsToMany(models.user, { through: 'user_tasks' });
  };

  Task.retrieveTasks = function(dependencyModel, parentId) {
    // console.log(typeof Dependency);
    // console.log(this);
    // console.log(typeof this.associations.dependencies);
    Task.findAll({
      where: { parentId },
      include: [{
        model: dependencyModel,
        as: 'dependencies',
        attributes: ['taskId'],
      }],
    })
    .then(tasks => console.log(tasks))
    .catch(err => console.log(err));
  };

  return Task;
};
// m.task.retrieveTasks(null)
// ISSUES with retriveTasks:
// 1:
//  tasks = await m.task.findAll({where: { parentId: null }, include: [{model: m.dependency, as: 'dependencies', required: true, attributes: ['taskId']}]}).then(tasks => tasks[0].dependencies[0].taskId)
// selects all the rows from dependency too :(
// => SELECT "task"."id", "dependencies"."taskId", "dependencies"."id" AS "dependencies.id", "dependencies"."taskId" AS "dependencies.taskId" FROM "tasks" AS "task" INNER JOIN "dependencies" AS "dependencies" ON "task"."id" = "dependencies"."dependentTaskId" WHERE "task"."parentId" IS NULL;
// 2: 
// Working in console but when call it from here, I get this error without reference to my code:
// "TypeError: Cannot read property 'getTableName' of undefined"