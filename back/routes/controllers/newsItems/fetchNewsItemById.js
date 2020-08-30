const NewsItem = require('../../../db/models/NewsItem');

const fetchAllNewsItemById = async (req, res) => {
  try {
    const newsItem = await NewsItem.findById(req.params.id)
    return res.json(newsItem);
  } catch (error) {
    res.json({nopostsfound: 'No newsitem found with this id'})
    console.log(error);
  }
}

module.exports = fetchAllNewsItemById;