const authMiddleware = (req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;
  if (res.locals.isLoggedIn) {
    res.locals.user = req.session.user;
    res.locals.decentra = req.session.decentra;
  } else {
    res.locals.user = null; 
  }
  next();
};

module.exports = { authMiddleware };
