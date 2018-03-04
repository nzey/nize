module.exports = (sequelize, DataTypes) => {
  const Dependency = sequelize.define('Dependency', {
    order: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: (models) => {
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
