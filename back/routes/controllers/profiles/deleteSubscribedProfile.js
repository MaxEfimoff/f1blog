const Profile = require('../../../db/models/Profile');

const deleteSubscribedProfile = async (req, res) => {
  try {
    const profile = await Profile
      .findOne({ user: req.user.id });

    const subscribedProfile = await Profile
      .findOne({ user: req.params.handle });

    // Get remove index
    const removeIndex = profile.subscribedProfiles
      .findIndex(x => x === subscribedProfile);

    // Splice out of array
    profile.subscribedProfiles.splice(removeIndex, 1);
    profile.save();
    return res.json(profile);
  } catch (error) {
    res.status(404).json(err);
  }
}

module.exports = deleteSubscribedProfile;