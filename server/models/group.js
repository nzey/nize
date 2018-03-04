module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Group.hasMany(models.Task);
      },
    },
  });
  return Group;
};
