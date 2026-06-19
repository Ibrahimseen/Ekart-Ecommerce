import express from "express";
import {  IsAuthenticated } from "../middlewear/isAuthenticated.js";
import { addToCart, getCart, removeFromCart, updateQuantity } from "../controller/cartController.js";

const router = express.Router();

router.get("/", getCart);
router.post("/add", IsAuthenticated,addToCart);
router.put("/update", IsAuthenticated,updateQuantity );
router.delete("/remove", IsAuthenticated, removeFromCart);

export default router;
