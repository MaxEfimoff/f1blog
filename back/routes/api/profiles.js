const express = require('express');
const passport = require('passport');

const router = express.Router();

// Controllers
const test = require('../controllers/profiles/test');
const all = require('../controllers/profiles/all');
const userProfile = require('../controllers/profiles/userProfile');
const userHandle = require('../controllers/profiles/userHandle');
const userId = require('../controllers/profiles/userId');
const createProfile = require('../controllers/profiles/createProfile');
const deleteSubscribedProfile = require('../controllers/profiles/deleteSubscribedProfile');
const deleteProfile = require('../controllers/profiles/deleteProfile');
const getAllSubscribedProfiles = require('../controllers/profiles/getAllSubscribedProfiles');
const addSubscribedProfile = require('../controllers/profiles/addSubscribedProfile');

// Shortened for /api/profiles/test
router.get('/test', test);
router.get('/all', passport.authenticate('jwt', { session: false }), all);
router.get('/', passport.authenticate('jwt', { session: false }), userProfile);
router.get(
  '/handle/:handle',
  passport.authenticate('jwt', { session: false }),
  userHandle
);
router.get(
  '/user/:user_id',
  passport.authenticate('jwt', { session: false }),
  userId
);
router.get(
  '/subscribedProfiles/all',
  passport.authenticate('jwt', { session: false }),
  getAllSubscribedProfiles
);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  createProfile
);
router.post(
  '/subscribedProfiles/:handle',
  passport.authenticate('jwt', { session: false }),
  addSubscribedProfile
);
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  deleteProfile
);
router.delete(
  '/subscribedProfiles/:handle',
  passport.authenticate('jwt', { session: false }),
  deleteSubscribedProfile
);

module.exports = router;
