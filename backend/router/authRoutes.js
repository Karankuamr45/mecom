import express from "express";
import { loginController, registerController, verifyOtpController } from "../controller/authController.js";
const authRoutes = express.Router();

authRoutes.post('/register',registerController);
authRoutes.post('/verify-otp', verifyOtpController);
authRoutes.post('/login',loginController)


export default authRoutes;