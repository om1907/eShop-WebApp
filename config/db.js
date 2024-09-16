const mongoose=require('mongoose')
const colors=require('colors');

const connectDB=async ()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Connected to mongodb successfully`);
    } catch (error) {
        console.log(`Error in MongoDb : ${error}`.bgRed.white)
    }
}

module.exports=connectDB