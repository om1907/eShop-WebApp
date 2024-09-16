const express = require('express')
const {
  RegisterController,
  loginController,
  forgotPasswordController,
} = require('../Controllers/authControllers')
const { requireSignIn } = require('../middleware/authMiddleware')

const router = express.Router()

//Register
router.post('/register', RegisterController)

//login
router.post('/login', loginController)

//forgot password
router.post('/forgot-password', forgotPasswordController)

//protected route auth
router.get('/user-auth', requireSignIn, (req, res) => {
  res.status(200).send({ ok: true })
})

module.exports = router
