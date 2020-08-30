const NewsItem = require('../../../db/models/NewsItem');
const Profile = require('../../../db/models/Profile');

const fetchProfileIdNewsItems = async (req, res) => {
  try {
    const profile = await Profile.findOne({ id: req.params.id });

    const newsItems = await NewsItem.find({ author: profile }).sort({
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
      nonewsitemsbyprofilehidfound: 'No news articles found',
    });
    console.log(error);
  }
};

module.exports = fetchProfileIdNewsItems;
