import userModel from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingEmail = await userModel.findOne({ email });
    const existingUsername = await userModel.findOne({ username });

    if (existingEmail) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    if (existingUsername) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      "mynameiskaranandiliveinramparkext",
      { expiresIn: "1d" }
    );

    // Generate OTP
    const otp = generateOTP();

    // Save OTP to user document
    newUser.otp = otp;
    await newUser.save();

    // Send OTP to the user's email
    await sendOtpEmail(email, otp);

    res
      .status(201)
      .json({ message: "User Registered Successfully", newUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const generateOTP = () => {
  // Generate a random 6-digit OTP
  return Math.floor(100000 + Math.random() * 900000);
};

const sendOtpEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "karankumarr0002@gmail.com",
        pass: "nwnjdpiiguwudbnt",
      },
    });

    const mailOptions = {
      from: "karankumarr0002@gmail.com",
      to: email,
      subject: "OTP for Email Verification",
      text: `Your OTP for email verification is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending OTP email:", error);
  }
};

const verifyOtpController = async (req, res) => {
  try {
    const { otp } = req.body;
    // Extract user ID from JWT token

    const token = req.headers.authorization;
    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const extractedToken = token.split(" ")[1];

    const decodedToken = jwt.verify(
      extractedToken,
      "mynameiskaranandiliveinramparkext"
    );
    console.log("decodedToken", decodedToken);
    const userId = decodedToken.userId;

    // Find the user by ID
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if the OTP matches
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Clear the OTP field in the user document
    user.otp = undefined;

    // Update isVerified field to true
    user.isVerified = true;

    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const loginController = async (req,res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      "mynameiskaranandiliveinramparkext",
      { expiresIn: "1d" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export { registerController, verifyOtpController,loginController };
