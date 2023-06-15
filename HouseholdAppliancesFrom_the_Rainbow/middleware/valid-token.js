const jwt = require('jsonwebtoken')
const config = require('config')


exports.needsAdminAccess = async (req, res, next) => {
  let token = await req.header('authorization').split(' ')[1]
  token = jwt.verify(token,  config.get('jwtSecret'))

  if (!token.user.dn.includes('ou=Admin')) {
    next(new Error('You must be an admin to access this route.'))
    return
  }

  next()
}

exports.requiresToken = async (req, res, next) => {
  let token = await req.header('authorization').split(' ')[1]
  token = jwt.verify(token,  config.get('jwtSecret'))
  res.json(token)
  next()
}