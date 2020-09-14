const NewsItem = require('../../../db/models/NewsItem');
const validateNewsItemtInput = require('../../../validation/newsItem');

const postNewsItemThread = (req, res) => {
  const { errors, isValid } = validateNewsItemtInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  NewsItem.findById(req.params.id)
    .then((newsItem) => {
      const newThread = {
        author: req.body.profile,
        text: req.body.text,
      };

      // Add to threads array
      newsItem.threads.push(newThread);

      // Save
      newsItem.save().then((newsItem) => res.json(newsItem));
    })
    .catch((err) =>
      res.status(404).json({
        status: 'fail',
        cannotpostnewsitemthread: 'Can not create new thead',
      })
    );
};

module.exports = postNewsItemThread;
