const validateNewsItemInput = require('../../../validation/newsItem');
const NewsItem = require('../../../db/models/NewsItem');
const createNewsItem = async (req, res) => {
  try {
    const { errors, isValid } = validateNewsItemInput(req.body);

  if(!isValid) {
    return res.status(400).json(errors)
  }

  const newsItem = new NewsItem({
    title: req.body.title,
    text: req.body.text,
    profile: req.body.profile
  });

  newsItem.save();
  return res.json(newsItem);

  } catch (error) {
    console.log(error);
    res.status(404).json("Was not able to save the news item");
  }
}

module.exports = createNewsItem;