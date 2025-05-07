import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../Utils/generateToken.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Every field is required",
                success: false
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists",
                success: false
            });
        }

        // Hash Password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create User
        const newUser = await User.create({
            name,
            email,
            password: hashPassword
        });

        return res.status(201).json({
          success:true,
          message:"account created successfull",
      })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to register"
        });
    }
};

//login part

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        // Find user in database
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        // Check if password is correct
        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            });
        }

        // Generate Token and Send Response
        generateToken(res, existingUser, `Login successful, Welcome ${existingUser.name}`);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to login"
        });
    }
};

//logout profile

export const logout =async (req,res)=>{
     try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            success:true,
            message:"logout successfull"
        })
     } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to logout"
        }) 
    
     }
}

//profile

export const getProfile = async (req, res) => {
    try {
      const userId = req.user.userId;
      const user = await User.findById(userId).select("-password");
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      return res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Failed to load profile",
      });
    }
  };
 
  
//seller
export const seller = async (req, res) => {
  try {
      const userId = req.user.userId;
      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).json({
              success: false,
              message: "User not found",
          });
      }

      if (user.role === "seller") {
          return res.status(400).json({
              success: false, 
              message: "User is already a seller",
          });
      }

      user.role = "seller";
      await user.save();

      // ✅ Generate new token with updated role
      return generateToken(res, user, "You are now a seller");

  } catch (error) {
      console.error(error);
      return res.status(500).json({
          success: false,
          message: "Failed to upgrade role",
      });
  }
};


