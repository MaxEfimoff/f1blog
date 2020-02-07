const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NewsItemSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'profile'
  },
  title: {
    type: String,
    required: true,
    max: 50,
    min: 6
  },
  text: {
    type: String,
    required: true,
    min: 100,
    max: 1000
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
        required: true
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
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = NewsItem = mongoose.model('newsItem', NewsItemSchema);