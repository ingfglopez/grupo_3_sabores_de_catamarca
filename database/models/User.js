module.exports = (sequelize, dataTypes) => {
  const alias = "User";

  const cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: dataTypes.STRING(25),
    },
    password: {
      type: dataTypes.STRING(100),
    },
    rol_id: {
      type: dataTypes.INTEGER,
    },
    person_id: {
      type: dataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
  };

  const config = {
    timestamps: false,
    tableName: "users",
  };

  const User = sequelize.define(alias, cols, config);

  User.associate = (models) => {
    User.belongsTo(models.Rol, {
      as: "rol",
      foreignKey: "rol_id",
    });

    User.belongsTo(models.Person, {
      as: "person",
      foreignKey: "person_id",
    });

    /*
    Movie.belongsToMany(models.Actor, {
      as: 'actors',
      through: 'actor_movie',
      foreignKey: 'movie_id',
      otherKey: 'actor_id',
      timestamps: false
    })
    */
  };

  return User;
};
