const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

  // skip if local host

  if (process.env.NODE_ENV === 'development') {
    next()
  } else {

    const token = req.get('authorization').split(' ')[1]

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, 'åß∂ƒœ∑®†¥øπåß∂ƒœ∑®†¥øπ')
    } catch (err) {
      err.statusCode = 500
      throw err;
    }
    if (!decodedToken) {
      const error = new Error('Not authenticated')
      error.statusCode = 401
      throw error;
    }
    req.userId = decodedToken.userId;
    next()
  }
}