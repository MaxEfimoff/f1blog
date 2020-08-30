const NewsItem = require('../../../db/models/NewsItem');
const Profile = require('../../../db/models/Profile');

const deleteNewsItemComment = (req, res) => {
    NewsItem.findById(req.params.id)
      .then(newsItem => {

        //Check to see if the comment exists
        if (
          newsItem.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }

        // Get remove index
        const removeIndex = newsItem.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        newsItem.comments.splice(removeIndex, 1);
        newsItem.save().then(newsItem => res.json(newsItem));
      })
      .catch(err => res.status(404).json({ newsitemnotfound: "No news article found" }));
  }

  module.exports = deleteNewsItemComment;