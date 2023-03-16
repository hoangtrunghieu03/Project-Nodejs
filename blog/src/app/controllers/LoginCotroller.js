const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const { response } = require('express');

class LoginController {
  //[GET] /Login
  login(req, res) {
    res.render('login', { 
      title: 'Đăng nhập' 
    });
    // res.json(Login(res.params))
  }

  // [POST] /login
  async checklogin (req, res) {
    const { email, password } = req.body;
      
    try {
      // Tìm kiếm người dùng với email được cung cấp
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Email không hợp lệ' });
      }
      
      // Kiểm tra tính hợp lệ của mật khẩu
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'mật khẩu không hợp lệ' });
      }
      req.session.isLoggedIn = true;
      req.session.user = user;
      return res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi máy chủ' });
    }
  };
}

module.exports = new LoginController();
