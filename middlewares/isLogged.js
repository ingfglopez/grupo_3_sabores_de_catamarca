
const isLogged = (req, res, next) => {

  // Si no hay un usuario logueado, se redirecciona al login
  if (!req.session.userLogged) {
    return res.redirect('/users/signin');
  }
  next();
}

module.exports = isLogged;