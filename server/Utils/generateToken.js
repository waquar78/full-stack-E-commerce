import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
    const token = jwt.sign({ userId: user._id , role: user.role  }, process.env.SECRET, { expiresIn: "1d" });

    return res
        .status(200)
        .cookie("token", token, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        })
        .json({
            success: true,
            message, 
            user,
        });
};
 