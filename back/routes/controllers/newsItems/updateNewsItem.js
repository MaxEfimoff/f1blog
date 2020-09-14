const NewsItem = require('../../../db/models/NewsItem');
const Profile = require('../../../db/models/Profile');
const validateNewsItemtInput = require('../../../validation/newsItem');

const updateNewsItem = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const { errors, isValid } = validateNewsItemtInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newsItemFields = {};
    newsItemFields.author = profile;

    if (req.body.title) newsItemFields.title = req.body.title;
    if (req.body.text) newsItemFields.text = req.body.text;

    const newsItem = await NewsItem.findById(req.params.id);

    if (newsItem.author.toString() !== profile.id) {
      return res
        .status(401)
        .json({ notauthorized: 'You cannot edit this article' });
    }

    newsItem.set(newsItemFields).save();

    return res.status(200).json({
      status: 'success',
      data: {
        newsItem,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'fail',
      cannotupdatenewsitem: 'Can not update the news article',
    });
  }
};

module.exports = updateNewsItem;
