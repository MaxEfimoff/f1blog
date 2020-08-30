const NewsItem = require('../../../db/models/NewsItem');
const Profile = require('../../../db/models/Profile');

const fetchMySubscribedProfilesNewsItems = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const newsItems = await NewsItem.find({
      author: { $in: profile.subscribedProfiles.map((a) => a.profile) },
    })
      .limit(10)
      .sort({ date: -1 });

    return res.status(200).json({
      status: 'success',
      results: newsItems.length,
      data: {
        newsItems,
      },
    });
  } catch {
    res
      .status(404)
      .json({
        status: 'fail',
        nomysubscribedprofilesfound: 'No news articles found',
      });
    console.log(error);
  }
};

module.exports = fetchMySubscribedProfilesNewsItems;
