const authMiddleware = (req, res, next) => {
  if (req.session.isLoggedIn) {
    res.locals.user = req.session.user;
  } else {
    res.locals.user = null; 
  }
  next();
};

module.exports = { authMiddleware };
