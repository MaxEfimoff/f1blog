const express = require('express');
const router = express.Router();
const passport = require('passport');

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

// Shortened for /api/profile/test
router.get('/test', test);
router.get('/all', passport.authenticate('jwt', {session: false}), all);
router.get('/', passport.authenticate('jwt', {session: false}), userProfile);
router.get('/handle/:handle', passport.authenticate('jwt', {session: false}), userHandle);
router.get('/user/:user_id', passport.authenticate('jwt', {session: false}), userId);
router.post('/', passport.authenticate('jwt', {session: false}), createProfile);
router.delete('/subscribedProfiles/:handle', passport.authenticate('jwt', { session: false }), deleteSubscribedProfile);
router.delete('/', passport.authenticate('jwt', { session: false }), deleteProfile);
router.get('/subscribedProfiles/all',  passport.authenticate('jwt', { session: false }), getAllSubscribedProfiles);
router.post('/subscribedProfiles', passport.authenticate('jwt', { session: false }), addSubscribedProfile);

module.exports = router;