module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define('type', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Type.hasMany(models.task);
        Type.belongsTo(models.resource);
      },
    },
  });
  return Type;
};
