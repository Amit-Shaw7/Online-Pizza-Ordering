import express, { Router } from 'express';
import { forgetPassword, login, logout, resetpassword, signup, verifyToken } from '../controllers/AuthController.js';
import { myProfile } from '../controllers/UserController.js';
const AuthRouter = express.Router();

// Signup
AuthRouter.post("/signup", signup)

// Login
AuthRouter.post("/login", login)

// For Logout ---------------------------------------------------------------
AuthRouter.get("/logout", logout)

// Check login or not
AuthRouter.get("/isloggedin", verifyToken, myProfile)

AuthRouter.post("/forgetpassword", forgetPassword);
AuthRouter.post("/resetpassword/:token", resetpassword);


export default AuthRouter;







