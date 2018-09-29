module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('group', {
    title: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Group.hasMany(models.task);
      },
    },
  });
  return Group;
};
