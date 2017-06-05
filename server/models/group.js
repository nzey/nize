'use strict';
module.exports = function(sequelize, DataTypes) {
  var Group = sequelize.define('Group', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: function(models) {
        Group.hasMany(models.Dependency, {
          foreignKey: 'groupId',
          as: 'dependencies',
        });
      },
    },
  });
  return Group;
};