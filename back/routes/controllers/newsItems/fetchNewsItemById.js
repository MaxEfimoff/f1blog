const NewsItem = require('../../../db/models/NewsItem');

const fetchNewsItemById = async (req, res) => {
  try {
    const newsItem = await NewsItem.findById(req.params.id);

    return res.status(200).json({
      status: 'success',
      data: {
        newsItem,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      nonewsitemsbyidfound: 'No news articles found  with this Id',
    });
    console.log(error);
  }
};

module.exports = fetchNewsItemById;
