const path = require("path");
const db = require("../../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require("moment");

const usersAPIController = {
  list: (req, res) => {
    db.User.findAll({
      include: [
        {
          association: "person",
        },
      ],
    }).then((users) => {
      let respuesta = {
        meta: {
          status: 200,
          count: users.length,
          url: "api/users",
        },
        users: users.map((user) => ({
          id: user.id,
          name: user.person.name,
          email: user.person.email,
          detail: `api/users/${user.id}`, // Aquí se genera la URL para el detalle del usuario
        })),
      };
      res.json(respuesta);
    });
  },

  detail: (req, res) => {
    db.User.findByPk(req.params.id, {
      include: [
        {
          association: "person",
        },
      ],
    }).then((user) => {
      let respuesta = {
        meta: {
          status: 200,
          count: user.length,
          url: "/api/users/:id",
        },
        data: {
          id: user.id,
          name: user.person.name,
          email: user.person.email,
          image: user.person.image,
          phonenumber: user.person.phonenumber,
          address: user.person.address,
          zipcode: user.person.zipcode,
        },
      };
      res.json(respuesta);
    });
  },
};

module.exports = usersAPIController;
