const NewsItem = require('../../../db/models/NewsItem');
const Profile = require('../../../db/models/Profile');

const fetchMySubscribedProfilesNewsItems = (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        NewsItem
          .find({author: { $in: profile.subscribedProfiles.map(a => a.profile) }})
          .sort({date: -1})
          .then(newsItems => res.json(newsItems)
          )
          .catch(err => res.status(404).json({nopostsfound: 'No posts found'}));
    })
  }

module.exports = fetchMySubscribedProfilesNewsItems;