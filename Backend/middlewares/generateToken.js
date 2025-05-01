import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET_KEY;
import User from "../users/user.model.js";
const generateToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        if(!user) {
            throw new Error("User not found.");
        }

        const token = jwt.sign({userId: user._id, role: user.role}, JWT_SECRET, { expiresIn: '7d' });
        return token;
    } catch(error) {
        console.error("Error in generating token", error);
        throw new Error("Error in generating token");
    }
}

export default generateToken