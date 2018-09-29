module.exports = (sequelize, DataTypes) => {
  const Resource = sequelize.define('resource', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    source: DataTypes.STRING, // url string
  }, {
    classMethods: {
      associate: (models) => {
        Resource.hasMany(models.task);
        Resource.hasMany(models.type);
      },
    },
  });
  return Resource;
};
