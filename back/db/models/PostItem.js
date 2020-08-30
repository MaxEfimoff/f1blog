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
    max: 150,
    min: 20
  },
  image: { 
    type: String 
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
  dislikes: [
    {
      profile: {
        type: Schema.Types.ObjectId,
        ref: 'profile'
      }
    }
  ],
  threads: [
    { 
      profile: {
        type: Schema.Types.ObjectId,
        ref: 'profile'
      },
      text: {
        type: String,
        min: 6,
        max: 500,
        required: true
      },
      likes: [
        {
          profile: {
            type: Schema.Types.ObjectId,
            ref: 'profile'
          }
        }
      ],
      dislikes: [
        {
          profile: {
            type: Schema.Types.ObjectId,
            ref: 'profile'
          }
        }
      ],
      rating: {
        type: Number,
        default: 100
      },
      comments: [
        {
          profile: {
            type: Schema.Types.ObjectId,
            ref: 'profile'
          },
          text: {
            type: String,
            min: 6,
            max: 500,
            required: true
          },
          likes: [
            {
              profile: {
                type: Schema.Types.ObjectId,
                ref: 'profile'
              }
            }
          ],
          dislikes: [
            {
              profile: {
                type: Schema.Types.ObjectId,
                ref: 'profile'
              }
            }
          ],
          rating: {
            type: Number,
            default: 100
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
  rating: {
    type: Number,
    default: 100
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

module.exports = PostItem = mongoose.model('postItem', PostItemSchema);