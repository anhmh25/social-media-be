const { asyncHandler } = require('../middlewares/asyncHandler');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const login = asyncHandler(async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(401).json({ message: 'Tên người dùng không tồn tại' });
      }
      if (password === user.password) {
        const token = jwt.sign({ username: user.username, userId: user._id }, 'your-secret-key', {
          expiresIn: '1h',
        });
        res.status(200).json({ token: token, user, message: 'Đăng nhập thành công' });
      } else {
        res.status(401).json({ message: 'Mật khẩu không đúng' });
      }
    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error);
      res.status(500).json({ message: 'Lỗi server' });
    }
  });

const logout = asyncHandler(async (req, res, next) => {
    req.logout((error) => {
        if (error) {
            console.log(error);
        }
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
                return res.redirect('/login');
            }
            res.clearCookie('connect.sid');
            res.redirect('/login');
        });
    });
});

const register = asyncHandler(async (req, res, next) => {
    try {
        const { username, password} = req.body;
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: 'Tên người dùng đã tồn tại' });
        }
        const newUser = new User({
            username,
            password,
        });
        await newUser.save();
        res.status(201).json({ message: 'Tài khoản đã được tạo' });
    } catch (error) {
        console.error('Lỗi khi tạo tài khoản:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});


module.exports = {
    login,
    logout,
    register,
};