module.exports = (req, res, next) => {
  if (req.params.userId && req.params.userId == req.user._id) {
    next();
  } else if (req.body.user_id && req.body.user_id == req.user._id) {
    next();
  } else {
    res.sendStatus(401);
  }
};
