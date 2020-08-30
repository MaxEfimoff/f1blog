const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ResetPasswordHashSchema = new Schema({
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: '1d' },
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});

module.exports = ResetPasswordHash = mongoose.model(
  'resetPasswordHash',
  ResetPasswordHashSchema
);
