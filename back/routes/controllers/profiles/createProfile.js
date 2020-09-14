const Profile = require('../../../db/models/Profile');
const validateProfileInput = require('../../../validation/profile');
const createProfile = async (req, res) => {
  try {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;

    // Check if handle was sent in from the form
    if (req.body.handle) profileFields.handle = req.body.handle;

    if (req.body.city) {
      profileFields.city = req.body.city;
    } else {
      profileFields.city = undefined;
    }

    if (req.body.status) {
      profileFields.status = req.body.status;
    } else {
      profileFields.status = undefined;
    }

    if (req.body.avatar) {
      profileFields.avatar = req.body.avatar;
    } else {
      profileFields.avatar = undefined;
    }

    if (req.body.background) {
      profileFields.background = req.body.background;
    } else {
      profileFields.background = undefined;
    }

    const profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.status(201).json(profile);
    } else {
      // Create profile

      // Check if handle already exists
      // Looking for handle in profileFields object
      const profile = await Profile.findOne({ handle: profileFields.handle });

      if (profile) {
        errors.handle = 'That handle already in use';
        return res.status(400).json(errors);
      }

      // Save profile if handle not in use
      new Profile(profileFields).save();
      return res.status(200).json({ msg: 'profile was created' });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ profile: 'There is no profile for this user' });
  }
};

module.exports = createProfile;
