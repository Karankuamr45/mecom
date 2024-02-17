import express from "express";
import { forgotPasswordController, loginController, registerController, resetPasswordController, verifyOtpController } from "../controller/authController.js";
const authRoutes = express.Router();

authRoutes.post('/register',registerController);
authRoutes.post('/verify-otp', verifyOtpController);
authRoutes.post('/login',loginController);
authRoutes.post('/forgot-password',forgotPasswordController);
authRoutes.post('/reset-password/:token',resetPasswordController);


export default authRoutes;