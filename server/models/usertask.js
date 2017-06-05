'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserTask = sequelize.define('UserTask', {
    order: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function(models) {
        UserTask.belongsTo(models.Task, {
          foreignKey: 'taskId',
        });
        UserTask.belongsTo(models.User, {
          foreignKey: 'userId',
        });
      },
    },
  });
  return UserTask;
};
