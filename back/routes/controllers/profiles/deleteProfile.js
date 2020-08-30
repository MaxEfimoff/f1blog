const Profile = require('../../../db/models/Profile');
const User = require('../../../db/models/User');

const deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });

    return res.json(profile);
  } catch (error) {
    console.log(error);
    res.status(404).json({ profile: 'There is no profile for this user' });
  }
};

module.exports = deleteProfile;
