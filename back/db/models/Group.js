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
    max: 40
  },
  status: {
    type: String
  },
  info: {
    type: String
  },
  title: {
    type: String,
    required: true
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
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Group = mongoose.model('group', GroupSchema);
