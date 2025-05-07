import express from "express"
import dotenv from "dotenv"
import dbConnection from "./Database/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js"
import productRoute from "./routes/productRoutes.js"
import uploadRoute from "./routes/uploadRoutes.js"
import cartRoute from "./routes/cartRoutes.js"
import wishlistRoute from "./routes/WishListRoutes.js"
import orderRoute from "./routes/orderRoutes.js"
import cors from "cors"

const app= express();

dotenv.config()
dbConnection();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()) ;

app.use(cors({
    origin:"  http://localhost:5173",
    credentials:true
}));

const PORT=8080
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/product",productRoute);
app.use("/api/v1/upload",uploadRoute);
app.use("/api/v1/cart",cartRoute);
app.use("/api/v1/wishlist",wishlistRoute);
app.use("/api/v1/order",orderRoute)
app.listen(PORT,(req,res)=>{
    console.log(`app is listening at ${PORT}`)
   
})