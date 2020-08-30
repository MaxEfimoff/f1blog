const express = require('express');
const router = express.Router();
const passport = require('passport');

// Controllers
const test = require('../controllers/newsItems/test');
const fetchAllNewsItems = require('../controllers/newsItems/fetchAllNewsItems');
const fetchMyNewsItems = require('../controllers/newsItems/fetchMyNewsItems');
const fetchNewsItemById = require('../controllers/newsItems/fetchNewsItemById');
const fetchProfileHandleAllNewsItems = require('../controllers/newsItems/fetchProfileHandleAllNewsItems');
const createNewsItem = require('../controllers/newsItems/createNewsItem');
const updateNewsItem = require('../controllers/newsItems/updateNewsItem');
const deleteNewsItem = require('../controllers/newsItems/deleteNewsItem');
const likeNewsItem = require('../controllers/newsItems/likeNewsItem');
const unlikeNewsItem = require('../controllers/newsItems/unlikeNewsItem');
const postNewsItemThread = require('../controllers/newsItems/postNewsItemThread');
const deleteNewsItemThread = require('../controllers/newsItems/deleteNewsItemThread');

// Shortened for /api/newsitems/test
router.get('/test', test);
router.get('/all', fetchAllNewsItems);
router.get(
  '/my-news',
  passport.authenticate('jwt', { session: false }),
  fetchMyNewsItems
);
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  fetchNewsItemById
);
router.get(
  '/:handle/all',
  passport.authenticate('jwt', { session: false }),
  fetchProfileHandleAllNewsItems
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  createNewsItem
);
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  likeNewsItem
);
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  unlikeNewsItem
);
router.post(
  '/thread/:id',
  passport.authenticate('jwt', { session: false }),
  postNewsItemThread
);

router.patch(
  '/:id/update-news',
  passport.authenticate('jwt', { session: false }),
  updateNewsItem
);
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  deleteNewsItem
);
router.delete(
  '/thread/:id/:thread_id',
  passport.authenticate('jwt', { session: false }),
  deleteNewsItemThread
);

module.exports = router;
