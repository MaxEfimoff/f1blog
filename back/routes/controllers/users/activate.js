// Load User model
const User = require('../../../db/models/User');
const ConfirmationHash = require('../../../db/models/ConfirmationHash');

const activate = async (req, res) => {
  try {
    const hash = req.params.hash;

    ConfirmationHash.findById(hash)
      .populate('user')
      .exec(async (errors, foundHash) => {
        if (errors) {
          errors.notValidHash = 'Некорректная контрольная строка';
          return res.status(404).json(errors);
        }

        await User.findByIdAndUpdate(
          foundHash.user.id,
          { $set: { active: true } },
          { new: true },
          (errors, updatedUser) => {
            if (errors) {
              errors.hashNotFound = 'Контрольная строка не найдена';
              return res.status(404).json(errors);
            }

            foundHash.remove(() => {});
            return res.json(updatedUser);
          }
        );
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = activate;
