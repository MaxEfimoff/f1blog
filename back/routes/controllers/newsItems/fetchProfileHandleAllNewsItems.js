const NewsItem = require('../../../db/models/NewsItem');
const Profile = require('../../../db/models/Profile');

const fetchProfileHandleAllNewsItems = async (req, res) => {
  try {
    const profile = await Profile.findOne({ handle: req.params.handle });

    const newsItems = await NewsItem.find({ author: profile }).limit(10).sort({
      date: -1,
    });

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

module.exports = fetchProfileHandleAllNewsItems;
