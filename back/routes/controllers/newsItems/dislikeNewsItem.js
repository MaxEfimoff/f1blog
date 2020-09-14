const NewsItem = require('../../../db/models/NewsItem');
const Profile = require('../../../db/models/Profile');

const dislikeNewsItem = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    console.log(profile);

    const newsItem = await NewsItem.findById(req.params.id);

    if (
      newsItem.dislikes.filter(
        (dislike) => dislike.profile.toString() === profile.id
      ).length > 0
    ) {
      return res
        .status(400)
        .json({ alreadyliked: 'User already disliked this news article' });
    }

    await newsItem.dislikes.unshift({ profile });

    await newsItem.save();

    return res.status(201).json({
      status: 'success',
      data: {
        newsItem,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'fail',
      cannotlikenewsitem: 'Can not dislike the news article',
    });
  }
};

module.exports = dislikeNewsItem;
