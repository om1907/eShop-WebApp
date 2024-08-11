const { hashPassword, comparePassword } = require("../helpers/authHelper");
const User = require("../models/userModels");
const jwt = require("jsonwebtoken");

exports.RegisterController = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phone, address } = req.body;

    //validation
    if (!name) {
      return res.send({ error: "Name is required" });
    }
    if (!email) {
      return res.send({ error: "Email is required" });
    }
    if (!password) {
      return res.send({ error: "Password is required" });
    }
    if (!confirmPassword) {
      return res.send({ error: "ConfirmPassword is required" });
    }
    if (!phone) {
      return res.send({ error: "Phone No. is required" });
    }
    if (!address) {
      return res.send({ error: "Address is required" });
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
      address,
      phone,
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
      return res.status(200).send({
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
        phone: user.phone,
        address: user.address,
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
