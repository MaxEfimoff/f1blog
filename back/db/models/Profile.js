const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  // The ones who are subscribed for me
  subscibers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'profile',
    },
  ],
  // The ones I am subscribed to
  subscribedProfiles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'profile',
    },
  ],
  // The ones I am subscribed to
  subscribedBlogs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'blog',
    },
  ],
  joinedGroups: [
    {
      type: Schema.Types.ObjectId,
      ref: 'group',
    },
  ],
  handle: {
    type: String,
    required: true,
    min: 2,
    max: 40,
  },
  avatar: {
    type: String,
    max: 200,
  },
  background: {
    type: String,
    max: 200,
  },
  status: {
    type: String,
    min: 2,
    max: 50,
  },
  karma: {
    type: Number,
    default: 1000,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
