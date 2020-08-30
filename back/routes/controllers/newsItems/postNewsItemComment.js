const NewsItem = require('../../../db/models/NewsItem');

const postNewsItemComment = (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    NewsItem.findById(req.params.id)
      .then(newsItem => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          author: req.body.profile,
        };

        // Add to comments array
        newsItem.comments.push(newComment);

        // Save
        newsItem.save().then(newsItem => res.json(newsItem));
      })
      .catch(err => res.status(404).json({ newsitemnotfound: "No post found" }));
  }

  module.exports = postNewsItemComment;