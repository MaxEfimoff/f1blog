const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ConfirmationHashSchema = new Schema({
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: '1d' }
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

module.exports = ConfirmationHash = mongoose.model('confirmationHash', ConfirmationHashSchema);
