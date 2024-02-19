
const userLoggedMiddleware = (req, res, next) => {
  res.locals.isLogged = false;
  //console.log('userLoggedMiddleware', req.session, req.session.userLogged);
  if (req.session && req.session.userLogged) {
    res.locals.isLogged = true;
  }
  next();
}

module.exports = userLoggedMiddleware;