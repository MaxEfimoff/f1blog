const NewsItem = require('../../../db/models/NewsItem');

const fetchAllNewsItems = async (req, res) => {
  try {
    const allNewsItems = await NewsItem.find()
      .limit(10)
      .sort({ createdAt: -1 });
    return res.json(allNewsItems);
  } catch (error) {
    res.json({ nopostsfound: 'No newsitems found' });
    console.log(error);
  }
};

module.exports = fetchAllNewsItems;
