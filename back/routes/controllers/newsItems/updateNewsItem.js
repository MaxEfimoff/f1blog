const NewsItem = require('../../../db/models/NewsItem');
const validateNewsItemtInput = require('../../../validation/newsItem');

const updateNewsItem = async (req, res) => {
  try {
    const { errors, isValid } = validateNewsItemtInput(req.body);

    if(!isValid) {
      return res.status(400).json(errors);
    }

    const newsItemFields = {};
    newsItemFields.author = req.body.profile;

    if(req.body.title) newsItemFields.title = req.body.title;
    if(req.body.text) newsItemFields.text = req.body.text;

    const newsItem = await NewsItem
      .findById(req.params.id)
    
    if(newsItem.author.toString() !== req.user.id) {
      return res.status(401).json({ notauthorized: 'User not authorized' })
    }
    
    newsItem
      .set(newsItemFields)
      .save();

    return res.json(newsItem);
  } catch (error) {
    console.log(error);
    res.status(404).json({ profile: "Can not update the post" });
  }
}

module.exports = updateNewsItem;