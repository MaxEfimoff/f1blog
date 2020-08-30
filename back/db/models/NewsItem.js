const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NewsItemSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'profile',
  },
  title: {
    type: String,
    required: true,
    max: 150,
    min: 20,
  },
  image: {
    type: String,
  },
  text: {
    type: String,
    required: true,
    min: 100,
    max: 1000,
  },
  likes: [
    {
      profile: {
        type: Schema.Types.ObjectId,
        ref: 'profile',
      },
    },
  ],
  dislikes: [
    {
      profile: {
        type: Schema.Types.ObjectId,
        ref: 'profile',
      },
    },
  ],
  threads: [
    {
      profile: {
        type: Schema.Types.ObjectId,
        ref: 'profile',
      },
      text: {
        type: String,
        min: 6,
        max: 500,
        required: true,
      },
      likes: [
        {
          profile: {
            type: Schema.Types.ObjectId,
            ref: 'profile',
          },
        },
      ],
      dislikes: [
        {
          profile: {
            type: Schema.Types.ObjectId,
            ref: 'profile',
          },
        },
      ],
      rating: {
        type: Number,
        default: 100,
      },
      comments: [
        {
          profile: {
            type: Schema.Types.ObjectId,
            ref: 'profile',
          },
          text: {
            type: String,
            min: 6,
            max: 500,
            required: true,
          },
          likes: [
            {
              profile: {
                type: Schema.Types.ObjectId,
                ref: 'profile',
              },
            },
          ],
          dislikes: [
            {
              profile: {
                type: Schema.Types.ObjectId,
                ref: 'profile',
              },
            },
          ],
          rating: {
            type: Number,
            default: 100,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
          updatedAt: {
            type: Date,
            default: Date.now,
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
    },
  ],
  tags: [
    {
      text: {
        type: String,
      },
    },
  ],
  rating: {
    type: Number,
    default: 100,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = NewsItem = mongoose.model('newsItem', NewsItemSchema);
