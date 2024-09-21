const { default: slugify } = require('slugify');
const { findByIdAndDelete } = require('../models/categoryModels');
const Category=require('../models/categoryModels')

exports.createCategoryController = async(req,res)=>{
    try {
        const {name}=req.body;
        if(!name){
            return res.status(401).send({
                success:false,
                message:"Category name is required"
            })
        }
        const existingCategory=await Category.findOne({name});
        if(existingCategory){
            return res.status(200).send({
                success:false,
                message:"Category already exists"
            })
        }
        const category=await new Category({name,slug:slugify(name)}).save();

        res.status(201).send({
            success:true,
            message:"new category created successfully",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in category catch block"
        })
    }
}

exports.updateCategoryController =async(req,res)=>{
    try {
        const {name}=req.body
        const {id}=req.params

        const category=await Category.findByIdAndUpdate(id,{name, slug:slugify(name)},{new:true});

        res.status(200).send({
            success:true,
            message:"Category updated successfully",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in catch block of update category controller'
        })
    }
}


exports.getAllCategoryController=async(req,res)=>{
    try {
        const category= await Category.find();
        res.status(200).send({
            success:true,
            message:"Successfully fetched all category ",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in catch block of get all category constroller"
        })
    }
}


exports.getSingleCategoryController=async(req,res)=>{
    try {
        const category=await Category.findOne({slug:req.params.slug});
        res.status(200).send({
            success:true,
            message:"Fetched single category successfully",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in catch block of get single category controller'
        })
    }
}


exports.deleteCategoryCaontroller=async(req,res)=>{
    try {
        const {id} =req.params;

        const category=await Category.findByIdAndDelete(id);
        res.status(202).send({
            success:false,
            message:"Category deleted successfully",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in catch block of delete category controller"
        })
    }
}