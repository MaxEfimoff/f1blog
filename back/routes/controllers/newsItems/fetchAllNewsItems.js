const NewsItem = require('../../../db/models/NewsItem');

const fetchAllNewsItems = async (req, res) => {
  try {
    const allNewsItems = await NewsItem.find().sort({date: -1});
    return res.json(allNewsItems);
  } catch (error) {
    res.json({nopostsfound: 'No posts found'})
    console.log(error);
  }
}

module.exports = fetchAllNewsItems;