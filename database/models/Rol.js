module.exports = (sequelize, dataTypes) => {

  const alias = 'Rol';

  const cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING(20)
    }
  }

  const config = {
    timestamps: false,
    tableName: "roles"
  }

  const Rol = sequelize.define(alias, cols, config);

  Rol.associate = (models) => {
    Rol.hasMany(models.User, {
      as: 'users',
      foreignKey: 'rol_id'
    })
  }

  return Rol;
}