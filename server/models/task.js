'use strict';
module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.STRING,
    notes: DataTypes.STRING,
    estimatedTime: { // hours, could be fraction of hour of multiple hours
      type: DataTypes.FLOAT,
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
    classMethods: {
      associate: function(models) {
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
      },
    },
  });
  return Task;
};
