module.exports = (sequelize, DataTypes) => {
  const UserTask = sequelize.define('UserTask', {
    order: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: (models) => {
        UserTask.belongsTo(models.Task);
        UserTask.belongsTo(models.User);
      },
    },
  });
  return UserTask;
};
