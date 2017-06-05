'use strict';
module.exports = function(sequelize, DataTypes) {
  var Dependency = sequelize.define('Dependency', {
    order: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function(models) {
        Dependency.belongsTo(models.Task, {
          foreignKey: 'taskId',
        });
        Dependency.belongsTo(models.Group, {
          foreignKey: 'groupId',
        });
      },
    },
  });
  return Dependency;
};
