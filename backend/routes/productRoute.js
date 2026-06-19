import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllproduct,
  updateProduct,
} from "../controller/productContoller.js";
import { isAdmin, IsAuthenticated } from "../middlewear/isAuthenticated.js";
import { multyUpload } from "../middlewear/mullter.js";

const router = express.Router();

router.get("/getallproducts", getAllproduct);
router.post("/add", IsAuthenticated, isAdmin, multyUpload, addProduct);
router.put("/update/:productId", IsAuthenticated, isAdmin, multyUpload,  updateProduct);
router.delete("/delete/:productId", IsAuthenticated, isAdmin, deleteProduct);

export default router;
