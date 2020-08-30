const NewsItem = require('../../../db/models/NewsItem');
const validateNewsItemtInput = require('../../../validation/newsItem');

const createNewsItem = async (req, res) => {
  try {
    const { errors, isValid } = validateNewsItemtInput(req.body);

    if(!isValid) {
      return res.status(400).json(errors);
    }

    const newsItemFields = {};
    newsItemFields.author = req.body.profile;

    if(req.body.title) newsItemFields.title = req.body.title;
    if(req.body.text) newsItemFields.text = req.body.text;

    new NewsItem(newsItemFields).save();
    return res.json(newsItemFields);
  } catch (error) {
    console.log(error);
    res.status(404).json({ profile: "Can not save the post" });
  }
}

module.exports = createNewsItem;