import express from "express";
import { IsAuthenticated, isAdmin } from "../middlewear/isAuthenticated.js";
import {
  createOrder,
  getAllOrdersAdmin,
  getMyOrder,
  getSalesData,
  getUserOrders,
} from "../controller/orderController.js";
const router = express.Router();

router.post("/create-order", IsAuthenticated, createOrder);
router.get("/myorder", IsAuthenticated, getMyOrder);
router.get("/all", IsAuthenticated, isAdmin, getAllOrdersAdmin  );
router.get("/user-order/:userId", IsAuthenticated, isAdmin, getUserOrders);
router.get("/sales", IsAuthenticated, isAdmin, getSalesData);

export default router;
