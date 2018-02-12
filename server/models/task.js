module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
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
    estimateConfidence: {
      type: DataTypes.INTEGER, // 30 means 30%, etc..INTEGER, // 30 means 30%, etc.
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
      scheduled: () => {}, // TODO
      recurring: () => {}, // TODO
      deadlined: () => {}, // TODO
      incomplete: () => {}, // TODO
      recentlyTouched: () => {}, // TODO
    },
  });

  // Class Methods
  Task.associate = (models) => {
    Task.belongsTo(models.Type, {
      foreignKey: 'typeId',
    });
    Task.belongsTo(models.Resource, {
      foreignKey: 'resourceId',
    });
    Task.hasMany(models.Dependency, {
      foreignKey: 'taskId',
      as: 'dependencies',
    });
    Task.hasMany(models.UserTask, {
      foreignKey: 'taskId',
      as: 'usertasks',
    });
  };

  Task.recurringToday = (date) => {}; // TODO
  Task.urgent = (date) => {}; // TODO

  // Instance Methods
  Task.prototype.estimateTime = () => {}; // TODO: sum up children, and add diff to estimatedTime
  Task.prototype.startable = () => {}; // TODO: if pre-reqs are complete
  Task.prototype.prerequisites = () => {}; // TODO: siblings w/lower order numbers and siblings of parent with lower order number than parent

  return Task;
};

