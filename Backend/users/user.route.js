import express from "express";
import User from "./user.model.js";
const router = express.Router();
import generateToken from "../middlewares/generateToken.js";

router.post("/register", async (req, res) => {
    try {
      const { username, email, password} = req.body;
      const user = new User({ username, email, password });
      await user.save();
      res.status(201).send({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error in user registration", error);
      res.status(500).send({ message: "Error in user registration" });
    }
  });
//login user endpoint
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid password." });
    }
    const token = await generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).send({
      message: "User logged in successfully",
      token,
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        profileImage: user.profileImage,
        bio: user.bio,
        profession: user.profession,
      },
    });
  } catch (error) {
    console.error("Error in user login", error);
    res.status(500).send({ message: "Error in user login" });
  }
});

//logout endpoint
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).send({ message: "Logged out successfully" });
});
  export default router
