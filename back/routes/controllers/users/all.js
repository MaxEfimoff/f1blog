const User = require('../../../db/models/User');

const all = async (req, res) => {
  try {
    const users = await User.find()
      .limit(10)
      .sort({ createdAt: -1 })
      .cache({ key: 'user' });
    return res.json(users);
  } catch (error) {
    console.log(error);
  }
};

module.exports = all;
