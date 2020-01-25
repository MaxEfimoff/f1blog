const bcrypt = require('bcryptjs');

// Load User model
const User = require('../../../db/models/User');
const ResetPasswordHash = require('../../../db/models/ResetPasswordHash');

const hashResetPassword = (req, res) => {
  const hash = req.body.hash;
  const password = req.body.password;

  ResetPasswordHash
    .findById(hash)
    .populate('user')
    .exec(
      async (errors, foundHash) => {
        if(errors) {
          errors.notValidHash = 'Некорректная контрольная строка';
          return res.status(404).json(errors);
        }

        const user = await User.findById(foundHash.user.id);
          if(!user) {
            errors.email = 'Пользователя с таким Email не существует';
            return res.status(400).json(errors);
          } else {

            // Encrypt the password
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(password, salt, 
                async (err, hash) => {
                  try {
                    user.password = hash;
                    await user.save();
                    return res.json(user);
                  } catch (error) {
                    console.log(error);
                  }
                });
            });

            foundHash.remove(() => {});
          }
      })
}

module.exports = hashResetPassword;