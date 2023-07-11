exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) next();
  else res.status(200).json({message : 'Need Login'});
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) next();
  else res.status(200).json({message : 'Already Logged in'});
};


