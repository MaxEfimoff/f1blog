const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostItemSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'profile'
  },
  title: {
    type: String,
    required: true,
    max: 100,
    min: 20
  },
  text: {
    type: String,
    required: true,
    max: 6000,
    min: 300
  },
  mainPost: {
    default: false
  },
  featuredPost: {
    default: false
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: 'group',
    default: null
  },
  likes: [
    {
      profile: {
        type: Schema.Types.ObjectId,
        ref: 'profile'
      }
    }
  ],
  comments: [
    {
      profile: {
        type: Schema.Types.ObjectId,
        ref: 'profile'
      },
      text: {
        type: String,
        required: true,
        min: 6,
        max: 500
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  tags: [
    {
      text: {
        type: String
      },
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = PostItem = mongoose.model('postItem', PostItemSchema);