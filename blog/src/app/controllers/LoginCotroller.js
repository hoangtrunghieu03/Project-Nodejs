const User = require('../models/Users');
const bcrypt = require('bcrypt');

class LoginController {
  //[GET] /Login
  login(req, res) {
    res.locals.title = 'Đăng nhập';
    res.render('login');
  }

  // [POST] /login
  async checklogin (req, res) {
    const { email, password } = req.body;
      
    try {
      const user = await User.findOne({ email });
      if (!user) {
        res.locals.email = 'Email không đúng';
        return res.status(400).render('login');
      }
      
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.locals.password = 'Password không đúng';
        return res.status(400).render('login');
      }
      // req.session.isLoggedIn = true;
      req.session.isLoggedIn = true;
      req.session.user = user; 
      
      if (user.decentra == 0) {
        req.session.decentra = true;
      }
      // console.log(user.decentra)

      return res.send(`<script>alert("Chào ${user.name} đã đến với khóa học của tôi"); window.location.href = "/";</script>`);
      // return res.redirect('/');
    } catch (error) {
      res.render('err') 
    }
  };

}

module.exports = new LoginController();
