import express from "express";
import { postAReview, getUsersReview, getTotalReviewsCount } from "./review.controller.js"
import verifyToken from "../middlewares/verifyToken.js";
const router = express.Router();

// post a review
router.post("/post-review",verifyToken, postAReview);

// review counts 
router.get("/total-reviews", getTotalReviewsCount )
// get review data for user
router.get("/:userId", getUsersReview);

export default router;