
const isLogged = (req, res, next) => {

  if (!req.session.userLogged) {
    return res.redirect('/users/signin');
  }
  next();
}

module.exports = isLogged;