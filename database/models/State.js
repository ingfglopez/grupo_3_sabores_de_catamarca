module.exports = (sequelize, dataTypes) => {
  const alias = "State";

  const cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: dataTypes.STRING(20),
    },
  };

  const config = {
    timestamps: false,
    tableName: "states",
  };

  const State = sequelize.define(alias, cols, config);

  State.associate = (models) => {
    State.hasMany(models.Person, {
      as: "person",
      foreignKey: "state_id",
    });
  };

  return State;
};
