const bcrypt = require('bcrypt');
const User = require('../models/Users');

class RegisterController {
  //[GET] /register
  register(req, res) {
    res.render('register', { title: 'Đăng Ký' })
  }

  //[POST] /register
  async checkregister(req, res) {
    const { email, password, confirmPassword } = req.body;

    // Kiểm tra mật khẩu và xác nhận mật khẩu
    if (password !== confirmPassword) {
      return res.status(400).send({ message: 'Mật khẩu không khớp.' });
    }
      
    // Kiểm tra xem tài khoản đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'Tài khoản đã tồn tại.' });
    }
      
    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash( password, 10);
      
    // Lưu tài khoản mới vào cơ sở dữ liệu
    const newUser = new User({
      email,
      password: hashedPassword
    });
    await newUser.save();  
    res.send({ message: 'Tài khoản đã được tạo.' });
  }

}

module.exports = new RegisterController();
