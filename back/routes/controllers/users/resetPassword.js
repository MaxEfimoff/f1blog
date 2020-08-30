const bcrypt = require('bcryptjs');
const User = require('../../../db/models/User');
const validateResetPasswordInput = require('../../../validation/resetPassword');
const ResetPasswordHash = require('../../../db/models/ResetPasswordHash');
const sendResetPasswordEmail = require('../../helpers/sendResetPasswordEmail');

const resetPassword = async (req, res) => {
  try {
    const { errors, isValid } = validateResetPasswordInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      errors.email = 'Пользователь с таким Email не существует';
      return res.status(400).json(errors);
    } else {
      // Encrypt the password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, async (err, hash) => {
          try {
            // Save the encrypted password in user object
            user.password = hash;
            await user.save();
            hash = new ResetPasswordHash({ user: user });

            await hash.save((err, createdHash) => {
              if (err) throw err;

              sendResetPasswordEmail(
                { toUser: user, hash: hash.id },
                (err, info) => {
                  if (err) throw err;

                  return res.json(user.email);
                }
              );
            });
          } catch (error) {
            console.log(error);
          }
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = resetPassword;
