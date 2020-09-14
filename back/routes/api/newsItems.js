const express = require('express');
const router = express.Router();
const passport = require('passport');

// Controllers
const createNewsItem = require('../controllers/newsItems/createNewsItem');
const deleteNewsItem = require('../controllers/newsItems/deleteNewsItem');
const deleteNewsItemThread = require('../controllers/newsItems/deleteNewsItemThread');
const fetchAllNewsItems = require('../controllers/newsItems/fetchAllNewsItems');
const fetchMyNewsItems = require('../controllers/newsItems/fetchMyNewsItems');
const fetchNewsItemById = require('../controllers/newsItems/fetchNewsItemById');
const fetchProfileHandleAllNewsItems = require('../controllers/newsItems/fetchProfileHandleAllNewsItems');
const likeNewsItem = require('../controllers/newsItems/likeNewsItem');
const postNewsItemThread = require('../controllers/newsItems/postNewsItemThread');
const test = require('../controllers/newsItems/test');
const unlikeNewsItem = require('../controllers/newsItems/unlikeNewsItem');
const updateNewsItem = require('../controllers/newsItems/updateNewsItem');

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
  '/:id',
  passport.authenticate('jwt', { session: false }),
  deleteNewsItem
);
router.delete(
  '/thread/:id/:thread_id',
  passport.authenticate('jwt', { session: false }),
  deleteNewsItemThread
);

module.exports = router;
