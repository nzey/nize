module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Group.hasMany(models.Dependency, {
          foreignKey: 'groupId',
          as: 'dependencies',
        });
      },
    },
  });
  return Group;
};
