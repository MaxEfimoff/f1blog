const NewsItem = require('../../../db/models/NewsItem');
const Profile = require('../../../db/models/Profile');

const unlikeNewsItem = (req, res) => {
  Profile.findOne({ user: req.user.id }).then((profile) => {
    NewsItem.findById(req.params.id)
      .then((newsItem) => {
        if (
          newsItem.likes.filter((like) => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ notliked: 'You have not yet liked this news article' });
        }

        // Get the remove index
        const removeIndex = newsItem.likes
          .map((item) => item.user.toString())
          .indexOf(req.user.id);

        // Splice out of array
        newsItem.likes.splice(removeIndex, 1);

        // Save
        newsItem.save().then((newsItem) => res.json(newsItem));
      })
      .catch((err) =>
        res.status(404).json({ postnotfound: 'News article not found' })
      );
  });
};

module.exports = unlikeNewsItem;
