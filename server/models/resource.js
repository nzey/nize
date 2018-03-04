module.exports = (sequelize, DataTypes) => {
  const Resource = sequelize.define('Resource', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    source: DataTypes.STRING, // url string
  }, {
    classMethods: {
      associate: (models) => {
        Resource.hasMany(models.Task);
        Resource.hasMany(models.Type);
      },
    },
  });
  return Resource;
};
