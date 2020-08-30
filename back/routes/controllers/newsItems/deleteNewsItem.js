const NewsItem = require('../../../db/models/NewsItem');
const validateNewsItemtInput = require('../../../validation/newsItem');

const deleteNewsItem = async (req, res) => {
  try {
    const newsItem = await NewsItem
      .findById(req.params.id)
    
    if(newsItem.author.toString() !== req.user.id) {
      return res.status(401).json({ notauthorized: 'User not authorized' })
    }

    newsItem
      .remove();

    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(404).json({ profile: "Can not delete the post" });
  }
}

module.exports = deleteNewsItem;