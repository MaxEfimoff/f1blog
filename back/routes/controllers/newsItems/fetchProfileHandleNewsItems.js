const NewsItem = require('../../../db/models/NewsItem');
const Profile = require('../../../db/models/Profile');

const fetchProfileHandleNewsItems = async (req, res) => {
  try {
    const profile = await Profile.findOne({ handle: req.params.handle });
    const profileHandleNewsItems = await NewsItem
      .find({author: profile})
      .sort({date: -1});
    return res.json(profileHandleNewsItems);
  } catch (error) {
    res.json({nopostsfound: 'No posts found'})
    console.log(error);
  }
}

module.exports = fetchProfileHandleNewsItems;