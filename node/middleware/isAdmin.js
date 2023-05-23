const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

  // skip if local host
  // console.log(process.env.NODE_ENV)
  if (process.env.NODE_ENV === 'development') {
    next()
  } else {

    const token = req.get('authorization').split(' ')[1]

    let decodedToken;
    try {
      decodedToken = jwt.verify(token)
      console.log('decodedToken: ', decodedToken)
      if (decodedToken.user.admin) {
        req.email = decodedToken.user.email
        next()
      } else {
        const error = new Error('Not authorized to access this page')
        error.statusCode = 401
        throw error;
      }
    } catch (err) {
      err.statusCode = 500
      throw err;
    }
    if (!decodedToken) {
      const error = new Error('Not authenticated')
      error.statusCode = 401
      throw error;
    }
  }

}