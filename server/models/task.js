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
  return Task;
};
