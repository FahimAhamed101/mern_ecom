import Products from "./products.model.js";
import express from "express";
const router = express.Router();
import Reviews from "../reviews/reviews.model.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";
import verifyToken from "../middlewares/verifyToken.js";
import {createNewProduct, getAllProducts, getSingleProduct, updateProductById, deleteProductById} from "./product.controller.js"
router.post("/create-product", async (req, res) => {
    try {
      const newProduct = new Products({ ...req.body });
      const savedProduct = await newProduct.save();
      //calculate review
      const reviews = await Reviews.find({ productId: savedProduct._id });
      if (reviews.length > 0) {
        const totalRating = reviews.reduce(
          (acc, review) => acc + review.rating,
          0
        );
        averageRating = totalRating / reviews.length;
        savedProduct.rating = averageRating;
        await savedProduct.save();
      }
      res.status(201).send(savedProduct);
    } catch (error) {
      console.log("Error in creating new product", error);
      res.status(400).send({ message: "Failed to create a new product" });
    }
  });
  
  router.post("/create-product", createNewProduct);

  // get all products
  router.get("/", getAllProducts);
  
  // get single product
  router.get("/:id", getSingleProduct);
  
  // update product (admin only)
  router.patch("/update-product/:id",verifyToken,verifyAdmin, updateProductById)
  
  // delete product (admin only)
  router.delete("/:id",verifyToken,verifyAdmin, deleteProductById)
  
  export default router