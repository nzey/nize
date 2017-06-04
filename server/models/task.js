'use strict';
module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    type: {
      type: DataTypes.INTEGER,
      references: {
        model: Type,
        key: 'id',
      }
    },
    notes: DataTypes.STRING,
    estimatedTime: DataTypes.FLOAT, // hours, could be fraction of hour of multiple hours
    estimateConfidence: DataTypes.INTEGER, // 30 means 30%, etc.
    actualTime: DataTypes.FLOAT,
    dateStarted: DataTypes.DATE,
    dateCompleted: DataTypes.DATE,
    deadline: DataTypes.DATE,
    specificTimeTask: DataTypes.DATE, // if a task must be done at a specific time/date
    recurrence: DataTypes.STRING, // '#/[min, hr, wk, month, m, m-t, m-t-w, etc]'
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Task;
};