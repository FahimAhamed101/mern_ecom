import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./users/user.route.js"
dotenv.config();


const port = process.env.PORT || 5000;
const app = express()
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use("/api/authRoutes", authRoutes);
async function main() {
  await mongoose.connect(process.env.DB_URL);
    app.get("/", (req, res) => {
      res.send("Lebaba E-commerce Server is running....");
    });
  }
  main()
  .then(() => console.log(" succesfully connected."))
  .catch((err) => console.log(err));
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });