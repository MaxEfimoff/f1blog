// Load User model
const User = require('../../../db/models/User');

const all = async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    console.log(error);
  }
}

module.exports = all;