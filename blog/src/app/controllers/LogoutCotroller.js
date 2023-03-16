class LogoutCotroller {
    checkLogout(req, res) {
        if (req.session) {
            // delete session object
            req.session.destroy(function (err) {
              if (err) {
                return next(err);
              } else {
                return res.redirect('/login');
                // res.json({mess: 'logout thanh cong'})
              }
            });
          }
    }
}

module.exports = new LogoutCotroller();
