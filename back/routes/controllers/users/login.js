const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../../config/keys');

// Load input validation
const validateLoginInput = require('../../../validation/login');

// Load User model
const User = require('../../../db/models/User');

const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      errors.userNotFound = 'Пользователь не найден';
      return res.status(404).json(errors);
    }

    if (user.active === false) {
      errors.hashNotActive =
        'На ваш email отправлена ссылка с активацией учетной записи';
      return res.status(404).json(errors);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      // User Matched, create JWT payload
      const payload = {
        id: user.id,
        name: user.name,
      };

      // Sign the JWT token
      jwt.sign(
        payload,
        keys.secretOrKey,
        { expiresIn: 604800 },
        (err, token) => {
          res.json({
            success: true,
            token: 'Bearer ' + token,
          });
        }
      );
    } else {
      errors.password = 'Некорректный пароль';
      return res.status(400).json(errors);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = login;
