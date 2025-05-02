import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./users/user.route.js"
import productRoutes from "./products/product.route.js"
import uploadImage from "./utils/UploadImage.js";
import orderRoutes from "./orders/order.route.js"
import reviewsRoutes from "./reviews/review.route.js"
dotenv.config();
import cors from "cors";
const app = express()
app.use(
  cors({
    origin: ["http://localhost:5173","https://reactnodeshop.vercel.app"],
    credentials: true,
  })
);
const port = process.env.PORT || 5000;

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/reviews',reviewsRoutes)

app.post("/uploadImage", (req, res) => {
  uploadImage(req.body.image)
    .then((url) => res.send(url))
    .catch((err) => res.status(500).send(err));
});

app.get("/", (req, res) => {
      res.send("Lebaba E-commerce Server is running....");
    });
async function main() {
  await mongoose.connect(process.env.DB_URL);
    
  }
  main()
  .then(() => console.log(" succesfully connected."))
  .catch((err) => console.log(err));
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });

