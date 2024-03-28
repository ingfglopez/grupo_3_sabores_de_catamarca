const isAdmin = (req, res, next) => {
  console.log('isAdmin', req.session.userLogged);
  if (!(req.session.userLogged.rol_id === 1)) {
    console.log('Debe ser administrador para acceder a esta funcion');
    res.locals.isAdmin = false;
    return res.send('Debe ser administrador para acceder a esta funcion');
  }
  res.locals.isAdmin = true;
  next();
}

module.exports = isAdmin