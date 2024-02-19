const db = require('../database/models');

const usernameInCookie = (req, res, next) => {

  if (req.cookies.username) {
    const usernameInCookie = req.cookies.username;

    // Valida el la cookie contra la base de datos
    db.User.findAll({
      where: {
        username: usernameInCookie
      }
    }).then(users => {
      if (users) {
        delete users[0].dataValues.password;
        req.session.userLogged = users[0].dataValues;
      }
      next();
    }).catch(error => {
      res.send('error');
    })
  } else {
    next();
  }
  
  //console.log('User in Cookie', req.cookies.username);
  //const allUsers = JSON.parse(fs.readFileSync('data/users.json', 'utf-8'));
}

module.exports = usernameInCookie;