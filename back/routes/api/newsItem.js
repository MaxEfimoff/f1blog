const express = require('express');
const router = express.Router();
const passport = require('passport');

// Controllers
const test = require('../controllers/newsItems/test');
const fetchAllNewsItems = require('../controllers/newsItems/fetchAllNewsItems');
const fetchNewsItemById = require('../controllers/newsItems/fetchNewsItemById');
const fetchMyNewsItems = require('../controllers/newsItems/fetchMyNewsItems');
const fetchMySubscribedProfilesNewsItems = require('../controllers/newsItems/fetchMySubscribedProfilesNewsItems');
const fetchProfileIdNewsItems = require('../controllers/newsItems/fetchProfileIdNewsItems');
const fetchProfileHandleNewsItems = require('../controllers/newsItems/fetchProfileHandleNewsItems');
const createNewsItem = require('../controllers/newsItems/createNewsItem');
const updateNewsItem = require('../controllers/newsItems/updateNewsItem');
const deleteNewsItem = require('../controllers/newsItems/deleteNewsItem');
const likeNewsItem = require('../controllers/newsItems/likeNewsItem');
const unlikeNewsItem = require('../controllers/newsItems/unlikeNewsItem');
const postNewsItemComment = require('../controllers/newsItems/postNewsItemComment');
const deleteNewsItemComment = require('../controllers/newsItems/deleteNewsItemComment');

// Shortened for /api/newsitems

router
  .get('/test', test)
  .get('/', fetchAllNewsItems)
  .get('/:id', passport.authenticate('jwt', {session: false}), fetchNewsItemById)
  .get('/my-news', passport.authenticate('jwt', {session: false}), fetchMyNewsItems)
  .get('/profile/:handle/', passport.authenticate('jwt', {session: false}), fetchProfileHandleNewsItems)
  .get('/profile/:id/', passport.authenticate('jwt', {session: false}), fetchProfileIdNewsItems)
  .get('/subscribed-profiles-news', passport.authenticate("jwt", { session: false }), fetchMySubscribedProfilesNewsItems)

  .post('/', passport.authenticate('jwt', {session: false}), createNewsItem)
  .post('/like/:id', passport.authenticate('jwt', {session: false}), likeNewsItem)
  .post('/unlike/:id', passport.authenticate('jwt', {session: false}), unlikeNewsItem)
  .post('/comment/:id', passport.authenticate('jwt', {session: false}), postNewsItemComment)

  .patch('/:id/update-news', passport.authenticate('jwt', {session: false}), updateNewsItem)
  .delete('/:id', passport.authenticate('jwt', {session: false}), deleteNewsItem)
  .delete('/comment/:id/:comment_id', passport.authenticate('jwt', {session: false}), deleteNewsItemComment);

module.exports = router;