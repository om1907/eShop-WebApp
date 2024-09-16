const express=require('express');
const { RegisterController, loginController } = require('../Controllers/authControllers');
const { isAdmin, requireSignIn } = require('../middleware/authMiddleware');

const router=express.Router();

//Register
router.post('/register',RegisterController);

//login
router.post('/login',loginController);

//protected route auth
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
})

module.exports=router;