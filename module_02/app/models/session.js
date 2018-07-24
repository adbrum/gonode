module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Session', {
    sid: {
      type: DataTypes.STRING,
      primaeyKey: true,
    },
    expires: DataTypes.DATE,
    data: DataTypes.TEXT,
  });

  return User;
};
