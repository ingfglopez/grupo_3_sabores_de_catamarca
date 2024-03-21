module.exports = (sequelize, dataTypes) => {

  const alias = 'Product';

  const cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING
    },
    description: {
      type: dataTypes.TEXT
    },
    image: {
      type: dataTypes.STRING,
      allowNull: true
    },
    category_id: {
      type: dataTypes.INTEGER
    },
    weight: {
      type: dataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    },
    stock: {
      type: dataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    price: {
      type: dataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0
    },
    last_price_change_date: {
      type: dataTypes.DATE,
      allowNull: true
    }
  }

  const config = {
    //timestamps: false,
    tableName: "products",
    paranoid: true
  }

  const Product = sequelize.define(alias, cols, config);

  Product.associate = (models) => {

    Product.belongsTo(models.Category, {
      as: 'category',
      foreignKey: 'category_id'
    })

  };

  return Product;
}