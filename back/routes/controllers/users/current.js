const current = async (req, res) => {
  try {
    return res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      active: req.user.active,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = current;
