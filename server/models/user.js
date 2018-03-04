module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
        User.hasMany(models.UserTask);
      },
    },
  });
  return User;
};
