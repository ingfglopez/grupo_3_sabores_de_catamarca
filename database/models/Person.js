module.exports = (sequelize, dataTypes) => {
  const alias = "Person";

  const cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: dataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: dataTypes.STRING(50),
      allowNull: false,
    },
    image: {
      type: dataTypes.STRING(200),
      allowNull: true,
    },
    phonenumber: {
      type: dataTypes.STRING(15),
      allowNull: true,
    },
    address: {
      type: dataTypes.STRING(150),
      allowNull: true,
    },
    zipcode: {
      type: dataTypes.STRING(10),
      allowNull: true,
    },
    state_id: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
  };

  const config = {
    //timestamps: false,
    tableName: "persons",
    paranoid: true
  };

  const Person = sequelize.define(alias, cols, config);

  Person.associate = (models) => {
    Person.hasMany(models.User, {
      foreignKey: "person_id",
      as: "user",
    });

    Person.belongsTo(models.State, {
      as: "state",
      foreignKey: "state_id",
    });
  };

  return Person;
};
