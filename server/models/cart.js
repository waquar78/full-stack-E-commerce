import mongoose from "mongoose"

const cartSchema=new mongoose.Schema({
     userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
     },
     products:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true
            },
            quantity:{
                type:Number,
                required:true,
                min:1
            },
            price:{
                type:Number,
                required:true
            }
        }
     ],
     totalPrice:{
        type:Number,
        default:0

     }

}, { timestamps: true }
)
//middleware for calculate price
cartSchema.pre("save", function (next) {
    this.totalPrice = this.products.reduce((total, item) => total + item.price * item.quantity, 0);
    next();
  });


const Cart=mongoose.model("Cart",cartSchema);
export default Cart
