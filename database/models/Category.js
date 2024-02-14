module.exports = (sequelize, dataTypes) => {

  const alias = 'Category';

  const cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING
    }
  }

  const config = {
    timestamps: false,
    tableName: "categories"
  }

  const Category = sequelize.define(alias, cols, config);

  Category.associate = (models) => {
    Category.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'category_id'
    })
  }

  return Category;
}