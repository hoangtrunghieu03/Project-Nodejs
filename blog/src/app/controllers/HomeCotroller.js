class HomeController {
    home (req, res) {
        res.render('home', { isLoggedIn: req.session.isLoggedIn})
    }
}

module.exports = new HomeController();
