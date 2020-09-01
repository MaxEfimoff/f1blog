const NewsItem = require('../../../db/models/NewsItem');
const Profile = require('../../../db/models/Profile');

const deleteNewsItemThread = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const newsItem = await NewsItem.findById(req.params.id);

    if (newsItem.author !== profile) {
      return res.status(401).json({ notauthorized: 'User not authorized' });
    }

    if (
      newsItem.threads.filter(
        (thread) => thread._id.toString() === req.params.thread_id
      ).length === 0
    ) {
      return res
        .status(404)
        .json({ status: 'fail', threadnotexists: 'Thread does not exist' });
    }

    // Get remove index
    const removeIndex = newsItem.threads
      .map((item) => item._id.toString())
      .indexOf(req.params.thread_id);

    // Splice thread out of array
    newsItem.threads.splice(removeIndex, 1);
    newsItem.save();

    return res.status(200).json({
      status: 'success',
      data: {
        newsItem,
      },
    });
  } catch {
    console.log(error);
    res
      .status(404)
      .json({
        status: 'fail',
        cantdeletenewsitemthread: 'Can not delete the thread',
      });
  }
};

module.exports = deleteNewsItemThread;
