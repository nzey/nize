module.exports = (sequelize, DataTypes) => {
  const UserTask = sequelize.define('UserTask', {
    order: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: (models) => {
        UserTask.belongsTo(models.Task, {
          foreignKey: 'taskId',
        });
        UserTask.belongsTo(models.User, {
          foreignKey: 'userId',
        });
      },
    },
  });
  return UserTask;
};
