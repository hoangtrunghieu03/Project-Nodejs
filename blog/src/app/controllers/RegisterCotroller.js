const bcrypt = require('bcrypt');
const User = require('../models/Users');

class RegisterController {
  //[GET] /register
  register(req, res) {
    res.locals.title = 'Đăng ký';
    res.render('register')
  }

  //[POST] /register
  async checkregister(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.locals.email = 'Email đã tồn tại';
      return res.status(400).render('register');
    }
    const hashedPassword = await bcrypt.hash( password, 10);
      
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      decentra: 1
    });

    await newUser.save();  
    res.send('<script>alert("Đăng ký thành công"); window.location.href = "/login";</script>');
    // res.render('/login');
  }

}

module.exports = new RegisterController();

