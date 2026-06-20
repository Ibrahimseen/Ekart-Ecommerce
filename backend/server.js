import express from "express";
import "dotenv/config";
import ConnectDB from "./database/db.js";
import userRouter from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";
import cors from "cors";
import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());

app.use(
  cors({
   origin: ["http://localhost:5173", "https://ekart-frontend-ug4u.onrender.com"],
    //  origin: "https://ekart-frontend-ug4u.onrender.com",
    credentials: true,
  }),
);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/orders", orderRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  ConnectDB();
  console.log(`server is listening on port ${port}`);
});
