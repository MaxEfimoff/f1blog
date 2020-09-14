const NewsItem = require('../../../db/models/NewsItem');

const fetchAllNewsItems = async (req, res) => {
  try {
    console.log(req.query);

    const newsItems = await NewsItem.find().limit(10).sort({ createdAt: -1 });

    return res.status(200).json({
      status: 'success',
      results: newsItems.length,
      data: {
        newsItems,
      },
    });
  } catch (error) {
    res
      .status(404)
      .json({ status: 'fail', nonewsitemsfound: 'No news articles found' });
    console.log(error);
  }
};

module.exports = fetchAllNewsItems;
