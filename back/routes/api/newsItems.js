const express = require('express');
const router = express.Router();
const passport = require('passport');

// Validation
// const validateNewsItemInput = require('../../validation/newsItem');

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
const postNewsItemComment = require('../controllers/newsItems/postNewsItemComment');
const deleteNewsItemComment = require('../controllers/newsItems/deleteNewsItemComment');

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
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  postNewsItemComment
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
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  deleteNewsItemComment
);

// //@route      GET api/friends-posts/
// //@desc       Get friends posts
// //@access     Private
// router.get('/friends-posts', passport.authenticate("jwt", { session: false }), (req, res) => {
//   Profile.findOne({ user: req.user.id })
//     .then(profile => {
//       Post
//         .find({name: { $in: profile.friends.map(a => a.handle) }})
//         .sort({date: -1})
//         .then(posts => res.json(posts)
//         )
//         .catch(err => res.status(404).json({nopostsfound: 'No posts found'}));
//   })
// })

//@route      PATCH api/posts/
//@desc       Update post
//@access     Private
router.patch(
  '/:id/update-post',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateNewsItemInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    // Get fields
    const postFields = {};
    if (req.body.text) postFields.text = req.body.text;
    if (req.body.name) postFields.name = req.body.name;
    if (req.body.profile) postFields.profile = req.body.profile;

    Post.findById(req.params.id).then((post) => {
      post.set(postFields);
      post.save().then((post) => res.json(post));
    });
  }
);

//@route      DELETE api/posts/:id
//@desc       Delete post by id
//@access     Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          // Check if current user is the post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }

          // Delete post
          post.remove().then(() => res.json({ success: true }));
        })
        .catch((err) =>
          res.status(404).json({ postnotfound: 'Post not found' })
        );
    });
  }
);

//@route      POST api/posts/like/:id
//@desc       Like post
//@access     Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          // Check if user already liked this post
          // Loops through likes array and checks if user id is there
          // If req.params.id is in the post.likes array, filtered array length will be > 0
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: 'User already liked this post' });
          }

          // Add user id to likes array
          post.likes.unshift({ user: req.user.id });

          post.save().then((post) => res.json(post));
        })
        .catch((err) =>
          res.status(404).json({ postnotfound: 'Post not found' })
        );
    });
  }
);

//@route      POST api/posts/unlike/:id
//@desc       Unike post
//@access     Private
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: 'You have not yet liked this post' });
          }

          // Get the remove index
          const removeIndex = post.likes
            .map((item) => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          post.likes.splice(removeIndex, 1);

          // Save
          post.save().then((post) => res.json(post));
        })
        .catch((err) =>
          res.status(404).json({ postnotfound: 'Post not found' })
        );
    });
  }
);

//@route      POST api/posts/comment/:id
//@desc       Add a comment post
//@access     Private
router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateNewsItemInput(req.body);

    // Check validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then((post) => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          profile: req.body.profile,
        };

        // Add to comments array
        post.comments.push(newComment);

        // Save
        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(404).json({ postnotfound: 'No post found' }));
  }
);

//@route      DELETE api/posts/comment/:id/:comment_id
//@desc       Delete a comment from post
//@access     Private
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        //Check to see if the comment exists
        if (
          post.comments.filter(
            (comment) => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: 'Comment does not exist' });
        }

        // Get remove index
        const removeIndex = post.comments
          .map((item) => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        post.comments.splice(removeIndex, 1);
        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(404).json({ postnotfound: 'No post found' }));
  }
);

//@route      GET api/posts
//@desc       Show user's posts
//@access     Private
router.get(
  '/handle/:handle/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ handle: req.params.handle }).then((profile) => {
      Post.find({ name: profile.handle })
        .sort({ date: -1 })
        .then((posts) => res.json(posts))
        .catch((err) =>
          res.status(404).json({ nophotofound: 'No posts found' })
        );
    });
  }
);

module.exports = router;
