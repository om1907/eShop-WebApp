const express = require('express')
const {
  RegisterController,
  loginController,
  forgotPasswordController,
  getAllUserscontroller,
  deleteUserController,
} = require('../Controllers/authControllers')
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware')

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

//protected admin-route auth
router.get('/admin-auth', requireSignIn,isAdmin, (req, res) => {
  res.status(200).send({ ok: true })
})

//get all users
router.get('/get-users',requireSignIn, isAdmin, getAllUserscontroller);

//delete user
router.delete('/delete-user/:id', requireSignIn, isAdmin, deleteUserController);

module.exports = router
