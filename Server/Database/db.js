import mongoose from "mongoose"


const dbConnection= async()=>{
    try {
       await mongoose.connect(process.env.MONGO_URI);
        console.log("database connected successfull");
        
    } catch (error) {
        console.log("database connecytion failed");
        
    }
}
export default dbConnection;