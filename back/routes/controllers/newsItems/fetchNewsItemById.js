const NewsItem = require('../../../db/models/NewsItem');

const fetchNewsItemById = async (req, res) => {
  try {
    const newsItemsById = await NewsItem.findById(req.params.id);
    return res.json(newsItemsById);
  } catch (error) {
    res.json({ nopostsfound: 'No post found with this Id' });
    console.log(error);
  }
};

module.exports = fetchNewsItemById;
