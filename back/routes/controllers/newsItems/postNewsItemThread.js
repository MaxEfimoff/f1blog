const NewsItem = require('../../../db/models/NewsItem');

const postNewsItemThread = (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  NewsItem.findById(req.params.id)
    .then((newsItem) => {
      const newThread = {
        text: req.body.text,
        name: req.body.name,
        author: req.body.profile,
      };

      // Add to threads array
      newsItem.threads.push(newThread);

      // Save
      newsItem.save().then((newsItem) => res.json(newsItem));
    })
    .catch((err) =>
      res
        .status(404)
        .json({
          status: 'fail',
          cannotpostnewsitemthread: 'Can not create new thead',
        })
    );
};

module.exports = postNewsItemThread;
