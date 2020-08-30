const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'profile'
  },
  handle: {
    type: String,
    required: true,
    min: 2,
    max: 40
  },
  status: {
    type: String,
    min: 6,
    max: 140
  },
  info: {
    type: String,
    min: 6,
    max: 140
  },
  title: {
    type: String,
    required: true,
    min: 6,
    max: 140
  },
  avatar: {
    type: String
  },
  background: {
    type: String
  },
  subscribers: [
    {
      profile: {
        type: Schema.Types.ObjectId,
        ref: 'profile'
      }
    }
  ],
  posts: [
    {
      postItem: {
        type: Schema.Types.ObjectId,
        ref: 'postItem'
      }
    }
  ],
  rating: {
    type: Number,
    default: 1000
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Group = mongoose.model('group', GroupSchema);