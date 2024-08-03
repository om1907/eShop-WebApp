const bcrypt=require('bcrypt');

exports.hashPassword=async(password)=>{
    try {
        const saltRounds=10;
        const hashedPassword=await bcrypt.hash(password,saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success:false,
            message:'Error in password hashing'
        })
    }
}

exports.comparePassword=async (password,hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword);
}