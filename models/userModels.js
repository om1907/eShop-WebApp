const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required:true,
        trim: true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
    },
    address:{
        type:String,
    },
    role:{
        type:Number,
        default:0
    },
    answer:{
        type: String,
    }
},{timestamps:true});

const User=mongoose.model('User',userSchema);

module.exports=User;