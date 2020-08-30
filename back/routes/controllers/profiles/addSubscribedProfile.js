const Profile = require('../../../db/models/Profile');

const addSubscribedProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const subscribedProfile = await Profile.findOne({
      user: req.params.handle,
    });

    if (
      profile.subscribedProfiles.filter(
        (newSubscribedProfile) => newSubscribedProfile === subscribedProfile
      ).length > 0
    ) {
      return res
        .status(400)
        .json({ alreadyfriend: 'You have already subscribed to this user' });
    }

    profile.subscribedProfiles.unshift(subscribedProfile);
    profile.save();

    return res.json(profile);
  } catch (error) {
    console.log(error);
    res.status(404).json({ profile: 'There is no profile for this user' });
  }
};

module.exports = addSubscribedProfile;
