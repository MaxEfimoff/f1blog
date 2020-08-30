const NewsItem = require('../../../db/models/NewsItem');
const Profile = require('../../../db/models/Profile');

const deleteNewsItem = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const newsItem = await NewsItem.findById(req.params.id);

    if (newsItem.author !== profile) {
      return res.status(401).json({ notauthorized: 'User not authorized' });
    }

    newsItem.remove();

    return res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'fail',
      cantdeletenewsitem: 'Can not delete the news article',
    });
  }
};

module.exports = deleteNewsItem;
