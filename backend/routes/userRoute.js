import express from "express";
import
{ AllUser,
ChangePassword, ForgotPassword, getUserById, Login, Logout, register, reVerify, updateUser, verify, VerifyOtp }
from "../controller/userController.js";
import { isAdmin, IsAuthenticated } from "../middlewear/isAuthenticated.js";
import { singleUpload } from "../middlewear/mullter.js";


const router = express.Router()

router.post("/register", register)
router.post("/verify", verify)
router.post("/reverify", reVerify)
router.post("/login", Login)
router.post("/logout", IsAuthenticated, Logout)
router.post("/forget-password", ForgotPassword)
router.post("/verify-otp/:email", VerifyOtp)
router.post("/change-password/:email", ChangePassword)
router.get("/all-user", IsAuthenticated ,isAdmin, AllUser)
router.get("/get-user/:userId", getUserById)
router.put("/update/:id", IsAuthenticated, singleUpload ,updateUser)

export default router