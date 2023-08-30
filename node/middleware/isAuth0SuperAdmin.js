module.exports = (req, res, next) => {

  try {
    console.log('req.auth', req.auth)
    if (req.auth.payload.permissions.includes('superadmin')) {
      console.log('is super admin')
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
}