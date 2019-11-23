const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const nodemailer = require('nodemailer');
const config = require('../../config/keys_dev');

// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User model
const User = require('../../db/models/User');
const ConfirmationHash = require('../../db/models/ConfirmationHash');

function sendConfirmationEmail({ toUser, hash }, callback) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.google_user,
      pass: config.google_password
    }
  })

  const message = {
    from: config.google_user,
    to: toUser.email,
    subject: 'Vuesocialnet - activate account',
    html: `
    <h3>Привет! ${toUser.name}</h3>
    <p>Спасибо за регистрацию на портале Fqblog.ru!</p>
    <p>для активации аккаунта, пройдите по ссылке: <a target="_" href="${config.domain}/users/${hash}/activate">${config.domain}/activate </a></p>
    `
  }

  transporter.sendMail(message, function(error, info) {
    if(error) {
      callback(error, null)
    } else {
      callback(null, info)
    }
  }) 
}

// Shortened for /api/users/test
router.get('/test', (req, res) => res.json({msg:'users work'}));

// GET api/users/register
// Register new user
// Public
router.post('/register', (req, res) => {

  // Pull out errors and isValid from vlidate/register
  // and passing in everythind that sent to this route
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if(!isValid) {
    // Sending the entire errors object with all the errors
    return res.status(400).json(errors);
  }

  // Check if email already exists
  User.findOne({ email: req.body.email })
    .then(user => {
      if(user) {
        errors.email = 'Такой Email уже существует';
        // Passing errors object from validateRegisterInput 
        // with errors.email property
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
            if(err) throw err;
            // Save the encrypted password in newUser object
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                const hash = new ConfirmationHash({ user: user});

                hash.save((err, createdHash) => {
                  if(err) throw err;

                  sendConfirmationEmail({ toUser: user, hash: hash.id }, (err, info) => {
                    if(err) throw err;

                    return res.json(user);
                  })
                })
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
});

// GET api/users//:hash/activete
// Actevate user
// Public
router.patch('/:hash/activate', (req, res) =>{
  const hash = req.params.hash;

  ConfirmationHash
    .findById(hash)
    .populate('user')
    .exec((errors, foundHash) => {
      if(errors) {
        errors.notValidHash = 'Некорректная контрольная строка';
        return res.status(404).json(errors);
      }

      User
        .findByIdAndUpdate(foundHash.user.id, { $set: { active: true } }, { new: true }, (errors, updatedUser) => {
          if(errors) {
            errors.hashNotFound = 'Контрольная строка не найдена';
            return res.status(404).json(errors);
          }

          foundHash.remove(() => {});
          return res.json(updatedUser);
        })
    })
})

// GET api/users/login
// Login user / Returning JWT Token
// Public
router.post('/login', (req, res) => {

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if(!isValid) {
    // Sending the entire errors object with all the errors
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email: req.body.email })
    .then(user => {
      // Check if user exists
      if(!user) {
        errors.userNotFound = 'Пользователь не найден';
        return res.status(404).json(errors)
      }

      if(user.active === false) {
        errors.hashNotActive = 'На ваш email ссылка с активацией учетной записи';
        return res.status(404).json(errors)
      }
      // Compare plain text password (password) from the form with the hash (user.password) in db
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(isMatch) {
            // User Matched
            // Create JWT payload
            const payload = {
              id: user.id,
              name: user.name,
            }

            // Sign the JWT token
            jwt.sign(
              payload, 
              keys.secretOrKey, 
              { expiresIn: 3600 }, 
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              }
            );
          } else {
            errors.password = 'Некорректный пароль';
            return res.status(400).json(errors);
          }
        });
    });
});


// GET api/users/current
// Return current user
// Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
})

// GET api/users/all
// Return all users
// Private
router.get('/all', passport.authenticate('jwt', { session: false }), (req, res) => {
  User.find().then(users => res.json(users));
})

module.exports = router;