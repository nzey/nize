module.exports = (sequelize, DataTypes) => {
  const Dependency = sequelize.define('dependency', {
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dependantTaskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  // Class Methods
  Dependency.associate = (models) => {
    Dependency.belongsTo(models.task, {
      foreignKey: 'dependantTaskId',
      as: 'dependantTask',
    });
    Dependency.belongsTo(models.task, {
      foreignKey: 'taskId',
      as: 'task',
    });
  };
  return Dependency;
};
