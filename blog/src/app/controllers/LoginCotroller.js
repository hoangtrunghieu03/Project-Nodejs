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
      // Tìm kiếm người dùng với email được cung cấp
      const user = await User.findOne({ email });
      if (!user) {
        res.locals.email = 'Email không đúng';
        return res.status(400).render('login');
      }
      
      // Kiểm tra tính hợp lệ của mật khẩu
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.locals.password = 'Password không đúng';
        return res.status(400).render('login');
      }
      req.session.isLoggedIn = true;
      req.session.user = user;
      //return res.send('<script>alert("Đăng nhập thành công"); window.location.href = "/";</script>');
      return res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi máy chủ' });
    }
  };
}

module.exports = new LoginController();
