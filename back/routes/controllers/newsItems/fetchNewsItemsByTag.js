const Tag = require('../../../db/models/Tag');

const fetchNewsItemsByTag = async (req, res) => {
  try {
    const tag = await Tag.findOne({
      title: req.params.title,
    });

    const newsItems = tag.newsItems;

    return res.status(200).json({
      status: 'success',
      results: newsItems.length,
      data: {
        newsItems,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      nonewsitemsbyprofilehandlefound: 'No news articles found',
    });
    console.log(error);
  }
};

module.exports = fetchNewsItemsByTag;
