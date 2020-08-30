const express = require('express');
const passport = require('passport');

const router = express.Router();

// Controllers
const test = require('../controllers/users/test');
const current = require('../controllers/users/current');
const all = require('../controllers/users/all');
const register = require('../controllers/users/register');
const resetPassword = require('../controllers/users/resetPassword');
const login = require('../controllers/users/login');
const activate = require('../controllers/users/activate');
const hashResetPassword = require('../controllers/users/hashResetPassword');

// Shortened for /api/users/test
router.get('/test', test);
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  current
);
router.get('/all', all);
router.post('/register', register);
router.post('/reset-password', resetPassword);
router.post('/login', login);
router.patch('/:hash/activate', activate);
router.patch('/:hash/reset-password', hashResetPassword);

module.exports = router;
