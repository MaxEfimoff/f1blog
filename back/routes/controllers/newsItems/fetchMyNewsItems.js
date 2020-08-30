const NewsItem = require('../../../db/models/NewsItem');
const Profile = require('../../../db/models/Profile');

const fetchMyNewsItems = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const myNewsItems = await NewsItem
      .find({author: profile})
      .sort({date: -1});
    return res.json(myNewsItems);
  } catch (error) {
    res.json({nopostsfound: 'No newsitems found'})
    console.log(error);
  }
}

module.exports = fetchMyNewsItems;