module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    tutle: DataTypes.STRING,
  });

  Category.associate = (models) => {
    Category.belongsTo(models.User);
    Category.hasMany(models.Snippet);
  };

  return Category;
};
