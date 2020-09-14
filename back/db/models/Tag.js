const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TagSchema = new Schema({
  title: {
    type: String,
    required: true,
    max: 150,
  },
  newsItems: [
    {
      newsItem: {
        type: Schema.Types.ObjectId,
        ref: 'newsItem',
      },
    },
  ],
  posts: [
    {
      post: {
        type: Schema.Types.ObjectId,
        ref: 'post',
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Tag = mongoose.model('tag', TagSchema);
