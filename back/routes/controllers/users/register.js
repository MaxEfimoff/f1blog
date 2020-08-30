const bcrypt = require('bcryptjs');
const User = require('../../../db/models/User');
const validateRegisterInput = require('../../../validation/register');
const ConfirmationHash = require('../../../db/models/ConfirmationHash');
const sendConfirmationEmail = require('../../helpers/sendConfirmationEmail');

const register = async (req, res) => {
  try {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Check if email already exists
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      errors.email = 'Такой Email уже существует';
      return res.status(400).json(errors);
    } else {
      // Create new User using mongoose User schema
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      // Encrypt the password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          // Save the encrypted password in newUser object
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              const hash = new ConfirmationHash({ user: user });

              hash.save((err, createdHash) => {
                if (err) throw err;

                sendConfirmationEmail(
                  { toUser: user, hash: hash.id },
                  (err, info) => {
                    if (err) throw err;

                    return res.json({
                      active: user.active,
                      _id: user._id,
                      name: user.name,
                      email: user.email,
                    });
                  }
                );
              });
            })
            .catch((err) => console.log(err));
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = register;
