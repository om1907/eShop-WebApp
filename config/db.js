const mongoose=require('mongoose')
const colors=require('colors');

const connectDB=async ()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Connected to database successfully : `.bgMagenta.white);
    } catch (error) {
        console.log(`Error in MongoDb : ${error}`.bgRed.white)
    }
}

module.exports=connectDB