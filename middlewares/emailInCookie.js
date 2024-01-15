const fs = require('fs');

const emailInCookie = (req, res, next) => {

  console.log(req.cookies);

  const emailUser = req.cookies.emailuser;
  const allUsers = JSON.parse(fs.readFileSync('data/users.json', 'utf-8'));
  const userFromCookie = allUsers.find(user => user.email == emailUser);

  if (userFromCookie) {
    req.session.userLogged = userFromCookie;
  }

  next();
}

module.exports = emailInCookie;