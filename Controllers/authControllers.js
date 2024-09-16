const { hashPassword, comparePassword } = require("../helpers/authHelper");
const User = require("../models/userModels");
const jwt = require("jsonwebtoken");

exports.RegisterController = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, answer } = req.body;
    //validation
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    if (!confirmPassword) {
      return res.send({ message: "ConfirmPassword is required" });
    }
    if (!answer) {
      return res.send({ message: "answer is required" });
    }
    if (password != confirmPassword) {
      return res.send({
        success: false,
        message: "Password and confirmPassword are not same",
      });
    }
    //check user
    const existingUser = await User.findOne({ email });
    //existing user
    if (existingUser) {
      return res.send({
        success: true,
        message: "Already Registered, please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new User({
      name,
      email,
      password: hashedPassword,
      answer
    }).save();

    res.status(201).json({
      success: true,
      message: "user registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "User registration failed due to Internal server error",
    });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(202).send({
        success: false,
        message: "Invalid password",
      });
    }
    //token
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

exports.forgotPasswordController = async (req, res) => {
    try {
        const {email,newPassword,answer}=req.body;
        if(!email){
            res.status(400).send({
                success:false,
                message:"Email is required"
            })
        }
        if(!newPassword){
            res.status(400).send({
                success:false,
                message:"newPassword is required"
            })
        }
        if(!answer){
            res.status(400).send({
                success:false,
                message:"answer is required"
            })
        }
        const user=await User.findOne({email,answer});
        if(!user){
            return res.status(404).send({
               success:false,
               message:"Wrong email or answer" 
            })
        }
        const hashedPassword= await hashPassword(newPassword);
        await User.findByIdAndUpdate(user._id,{password:hashedPassword});
        res.status(200).send({
            success:true,
            message:"password reset successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"something wrong in forgotPassword"
        })
    }
};
