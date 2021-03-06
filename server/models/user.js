module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maxHoursPerDay: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 8,
      validate: { max: 12 },
    },
  }, {
    classMethods: {
      associate: (models) => {
        User.belongsToMany(models.task, { through: 'user_tasks' });
      },
    },
  });
  return User;
};
