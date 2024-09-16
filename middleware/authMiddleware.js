const JWT = require('jsonwebtoken')
const User = require('../models/userModels')

exports.requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
    req.user = decode
    next()
  } catch (error) {
    console.log(error)
    res.status(401).send({
      success: false,
      message: 'Error in token verification',
    })
  }
}

exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
    if (!user.role) {
      return res.status(401).send({
        success: false,
        message: 'Unauthorised access',
      })
    } else {
      next()
    }
  } catch (error) {
    console.log(error)
    res.status(401).send({
      success: false,
      message: 'Error in adminverification',
    })
  }
}
