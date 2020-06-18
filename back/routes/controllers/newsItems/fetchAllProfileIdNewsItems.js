const NewsItem = require('../../../db/models/NewsItem');
const Profile = require('../../../db/models/Profile');

const fetchMyNewsItems = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const myNewsItems = await NewsItem
      .find({name: profile.handle})
      .sort({date: -1});
    return res.json(myNewsItems);
  } catch (error) {
    res.json({nopostsfound: 'No posts found'})
    console.log(error);
  }
}

module.exports = fetchMyNewsItems;


router.get('/:id', passport.authenticate("jwt", { session: false }), (req, res) => {
    Post
      .findById(req.params.id)
      .then(post => res.json(post))
      .catch(err => res.status(404).json({nopostfound: 'No post found with that Id'}));
  })