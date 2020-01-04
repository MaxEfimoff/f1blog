const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

module.exports = loginUser = () => {
  const payload = {
    id: '5dd96782fd4aeb0a2444fab1',
    name: 'Max'
  }

  const token = 'Bearer ' + jwt.sign(payload, keys.secretOrKey, { expiresIn: 604800 });

  return token;
}