const NewsItem = require('../../../db/models/NewsItem');
const Profile = require('../../../db/models/Profile');
const Tag = require('../../../db/models/Tag');
const validateNewsItemtInput = require('../../../validation/newsItem');

const createNewsItem = async (req, res) => {
  try {
    const { errors, isValid } = validateNewsItemtInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profile = await Profile.findOne({
      user: req.user.id,
    });

    const newsItemFields = {};
    newsItemFields.author = profile;

    if (req.body.title) newsItemFields.title = req.body.title;
    if (req.body.text) newsItemFields.text = req.body.text;
    if (req.body.tags) newsItemFields.tags = req.body.tags;

    const newsItem = await new NewsItem(newsItemFields).save();

    if (req.body.tags) {
      newsItemFields.tags.map(async (tag) => {
        let existingTag = await Tag.findOne({ title: tag });

        if (!existingTag) {
          existingTag = await new Tag({ title: tag }).save();
        }

        existingTag.newsItems.unshift({ newsItem });
        existingTag.save();
      });
    }

    return res.status(201).json({
      status: 'success',
      data: {
        newsItemFields,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'fail',
      cantcreatenewsitem: 'Can not save the news article',
    });
  }
};

module.exports = createNewsItem;
