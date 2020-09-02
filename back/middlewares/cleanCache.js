const { clearCache, clearHash } = require('../services/cache');

module.exports = async (req, res, next) => {
  // Needed to execute middleware after the api call
  await next();

  clearHash('user');
  //   clearHash('req.user.id);
};
