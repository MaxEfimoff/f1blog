const Profile = require('../../../db/models/Profile');

const all = async (req, res) => {
  try {
    const errors = {};

    const profiles = await Profile.find().populate('user', ['name', 'avatar']);

    if (!profiles) {
      errors.noprofile = 'There are no profiles';
      return res.status(404).json(errors);
    } else {
      return res.json(profiles);
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ profile: 'There are no profiles' });
  }
};

module.exports = all;
