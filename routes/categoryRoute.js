const express=require('express');
const { createCategoryController, updateCategoryController, getAllCategoryController, deleteCategoryCaontroller, getSingleCategoryController } = require('../Controllers/categoryControllers');
const  { isAdmin, requireSignIn } =require('../middleware/authMiddleware');


const router=express.Router();

router.post('/create-category',requireSignIn,isAdmin,createCategoryController);

router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController);

router.get('/categories',requireSignIn,isAdmin,getAllCategoryController);

router.get('/category/:slug',requireSignIn,isAdmin,getSingleCategoryController);

router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryCaontroller);

module.exports=router
