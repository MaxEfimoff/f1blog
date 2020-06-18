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
    min: 2,
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
  status: {
    type: String,
    min: 2,
    max: 50
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
