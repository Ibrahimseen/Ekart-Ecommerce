import crypto from "crypto";
import { Order } from "../models/orderModel.js";
import { Cart } from "../models/cartModel.js";
import { User } from "../models/userModel.js";
import { Product } from "../models/productModel.js";

// Create Razorpay Order
export const createOrder = async (req, res) => {
  try {
    const { products, amount, tax, shipping, currency } = req.body;
    const userId = req.user._id;

    const newOrder = new Order({
      user: req.user._id,
      products,
      amount,
      tax,
      shipping,
      currency,
      status: "Paid",
    });

    await newOrder.save();
    console.log("✅ Order saved to DB:", newOrder);

    await Cart.findOneAndUpdate(
      { userId },
      { $set: { items: [], totalPrice: 0 } },
    );

    res.json({
      success: true,
      dbOrder: newOrder,
    });
  } catch (error) {
    console.error("❌ Error in createOrder:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyOrder = async (req, res) => {
  try {
    const userId = req.id; // userId will come from URL
    const orders = await Order.find({ user: userId })
      .populate({
        path: "products.productId",
        select: "productName productPrice productImg",
      }) // fetch product details
      .populate("user", "firstName lastName email"); // fetch user info

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// // Get all orders (Admin only)
export const getAllOrdersAdmin = async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .populate("user", "name email") // populate user info
      .populate("products.productId", "productName productPrice"); // populate product info

    res.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("❌ Error in getAllOrdersAdmin:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch all orders",
      error: error.message,
    });
  }
};

// //get user orders
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params; // userId will come from URL

    const orders = await Order.find({ user: userId })
      .populate({
        path: "products.productId",
        select: "productName productPrice productImg",
      }) // fetch product details
      .populate("user", "firstName lastName email"); // fetch user info

    // if (!orders || orders.length === 0) {
    //   return res.status(404).json({ message: "No orders found for this user" });
    // }

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getSalesData = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({});
    const totalProducts = await Product.countDocuments({});
    const totalOrders = await Order.countDocuments({ status: "Paid" });

    // 1️⃣ Total sales amount
    const totalSalesAgg = await Order.aggregate([
      { $match: { status: "Paid" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalSales = totalSalesAgg[0]?.total || 0;

    // 2️⃣ Sales grouped by date (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const salesByDate = await Order.aggregate([
      { $match: { status: "Paid", createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          amount: { $sum: "$amount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const formattedSales = salesByDate.map((item) => ({
      date: item._id,
      amount: item.amount,
    }));

    res.json({
      success: true,
      totalUsers,
      totalProducts,
      totalOrders,
      totalSales,
      sales: formattedSales,
    });
  } catch (error) {
    console.error("Error fetching sales data:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
