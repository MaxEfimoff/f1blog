const NewsItem = require('../../../db/models/NewsItem');
const Profile = require('../../../db/models/Profile');

const fetchProfileIdNewsItems = async (req, res) => {
  try {
    const profile = await Profile.findOne({ id: req.params.id });
    const profileIdNewsItems = await NewsItem.find({ author: profile }).sort({
      date: -1,
    });
    return res.json(profileIdNewsItems);
  } catch (error) {
    res.json({ nopostsfound: 'No posts found' });
    console.log(error);
  }
};

module.exports = fetchProfileIdNewsItems;
