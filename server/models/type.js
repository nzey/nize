'use strict';
module.exports = function(sequelize, DataTypes) {
  var Type = sequelize.define('Type', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: function(models) {
        Type.hasMany(models.Task, {
          foreignKey: 'typeId',
          as: 'tasks',
        });
        Type.belongsTo(models.Resource, {
          foreignKey: 'resourceId',
        });
      },
    },
  });
  return Type;
};