
const mainController = {

  home: (req, res) => {
    console.log(res.locals);
    res.render('home')
  },
  about: (req, res) => {
    res.render('about')
  }
}

module.exports = mainController;

