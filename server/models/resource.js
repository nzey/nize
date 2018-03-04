module.exports = (sequelize, DataTypes) => {
  const Resource = sequelize.define('Resource', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    source: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
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
