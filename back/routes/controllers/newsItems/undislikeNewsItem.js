const NewsItem = require('../../../db/models/NewsItem');
const Profile = require('../../../db/models/Profile');

const undislikeNewsItem = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const newsItem = await NewsItem.findById(req.params.id);

    if (
      newsItem.dislikes.filter(
        (dislike) => dislike.profile.toString() === profile.id
      ).length === 0
    ) {
      return res.status(400).json({
        status: 'fail',
        notliked: 'You have not yet disliked this news article',
      });
    }

    // Get the remove index
    const removeIndex = newsItem.dislikes
      .map((item) => item.profile.toString())
      .indexOf(req.user.id);

    // Splice out of array
    newsItem.dislikes.splice(removeIndex, 1);

    // Save
    newsItem.save().then((newsItem) => res.json(newsItem));
  } catch {
    console.log(error);
    res.status(404).json({
      status: 'fail',
      cannotunlikenewsitem: 'Can not unlike this news article',
    });
  }
};

module.exports = undislikeNewsItem;
