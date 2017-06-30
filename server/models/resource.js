'use strict';
module.exports = function(sequelize, DataTypes) {
  var Resource = sequelize.define('Resource', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    source: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        Resource.hasMany(models.Task, {
          foreignKey: 'resourceId',
          as: 'tasks',
        });
        Resource.hasMany(models.Type, {
          foreignKey: 'resourceId',
          as: 'types',
        });
      },
    },
  });
  return Resource;
};