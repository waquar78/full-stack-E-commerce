import mongoose from "mongoose"

const prodctSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    stock:{
          type:Number
    },
    category:{
        type:String
    },
    price:{
        type:String
    },
    description:{
        type:String
    },
    photo:{
        type:String
    },
    sellerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})
 
const Product=mongoose.model("Product",prodctSchema);
export default Product
