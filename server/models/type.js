module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define('Type', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Type.hasMany(models.Task);
        Type.belongsTo(models.Resource);
      },
    },
  });
  return Type;
};