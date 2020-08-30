const NewsItem = require('../../../db/models/NewsItem');
const Profile = require('../../../db/models/Profile');

const likeNewsItem = (req, res) => {
  Profile.findOne({ user: req.user.id }).then((profile) => {
    NewsItem.findById(req.params.id)
      .then((newsItem) => {
        // Check if user already liked this post
        // Loops through likes array and checks if user id is there
        // If req.params.id is in the post.likes array, filtered array length will be > 0
        if (
          newsItem.likes.filter((like) => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ alreadyliked: 'User already liked this news article' });
        }

        // Add user id to likes array
        newsItem.likes.unshift({ user: req.user.id });

        newsItem.save().then((newsItem) => res.json(newsItem));
      })
      .catch((err) =>
        res.status(404).json({ postnotfound: 'News article not found' })
      );
  });
};

module.exports = likeNewsItem;
