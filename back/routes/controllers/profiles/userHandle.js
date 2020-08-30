const Profile = require('../../../db/models/Profile');

const userHandle = async (req, res) => {
  try {
    const errors = {};

    const profile = await Profile.findOne({
      handle: req.params.handle,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      errors.noprofile = 'There is no profile for this user';
      return res.status(404).json(errors);
    } else {
      return res.json(profile);
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ profile: 'There is no profile for this user' });
  }
};

module.exports = userHandle;
