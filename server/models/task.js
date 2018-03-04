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
    groupPosition: DataTypes.INTEGER,
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
    Task.hasMany(models.Task, {
      foreignKey: 'parentId',
      as: 'children',
    });
    Task.belongsTo(models.Type);
    Task.belongsTo(models.Resource);
    Task.belongsTo(models.Group);
    Task.belongsToMany(models.User, { through: 'UserTask' });
  };
  return Task;
};
