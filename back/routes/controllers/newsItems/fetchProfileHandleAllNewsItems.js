const NewsItem = require('../../../db/models/NewsItem');
const Profile = require('../../../db/models/Profile');

const fetchProfileHandleAllNewsItems = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.handle});
    const myNewsItems = await NewsItem
      .find({name: profile.handle})
      .sort({date: -1});
    return res.json(myNewsItems);
  } catch (error) {
    res.json({nopostsfound: 'No newsitems found'})
    console.log(error);
  }
}

module.exports = fetchProfileHandleAllNewsItems;