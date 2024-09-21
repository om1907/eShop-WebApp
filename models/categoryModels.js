const mongoose=require('mongoose')

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
},{timestamps:true})

const Category =mongoose.model('Category',CategorySchema);

module.exports=Category