
const userLoggedMiddleware = (req, res, next) => {
  res.locals.isLogged = false;
  //console.log('userLoggedMiddleware', req.session, req.session.userLogged);
  if (req.session && req.session.userLogged) {
    res.locals.isLogged = true;
    res.locals.isAdmin = (req.session.userLogged.rol_id == 1) ? true : false;
  }
  next();
}

module.exports = userLoggedMiddleware;