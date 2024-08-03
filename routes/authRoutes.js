const express=require('express');
const { RegisterController, loginController } = require('../Controllers/authControllers');
const { isAdmin, requireSignIn } = require('../middleware/authMiddleware');

const router=express.Router();

//Register
router.post('/register',RegisterController);

//login
router.post('/login',requireSignIn,isAdmin,loginController);

module.exports=router;