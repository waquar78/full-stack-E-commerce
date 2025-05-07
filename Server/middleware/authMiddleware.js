import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token; 

    console.log("Token received:", token); 
 
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized access! Token missing."
        });
    }

    try {
       
        const decoded = jwt.verify(token, process.env.SECRET); 
        console.log("Decoded Token:", decoded); 

        req.user = decoded; 
        console.log("req.use");
        
        next(); 
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Session expired! Please login again."
            });
        }
        return res.status(401).json({
            success: false,
            message: "Invalid token!"
        });
    }
};
 