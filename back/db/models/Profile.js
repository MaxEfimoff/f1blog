const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  subscribedProfiles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'profile'
    }
  ],
  subscribedBlogs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'blog'
    }
  ],
  joinedGroups: [
    {
      type: Schema.Types.ObjectId,
      ref: 'group'
    }
  ],
  handle: {
    type: String,
    required: true,
    max: 40
  },
  avatar: {
    type: String,
    max: 200
  },
  background: {
    type: String,
    max: 200
  },
  city: {
    type: String,
    max: 40
  },
  status: {
    type: String,
    max: 50
  },
  vk: {
    type: String,
    max: 100
  },
  odnoklassniki: {
    type: String,
    max: 100
  },
  youtube: {
    type: String,
    max: 100
  },
  twitter: {
    type: String,
    max: 100
  },
  facebook: {
    type: String,
    max: 100
  },
  instagram: {
    type: String,
    max: 100
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
