import { asyncError } from "../middlewares/error.js";
import UserModel from "../models/UserModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import CartModel from "../models/CartModel.js";
import { sendMailToUser } from "../utils/Mail.js";

export const logout = (req, res, next) => {
    res.clearCookie(String("pijjAccessToken"), {
        secure: process.env.NODE_ENV === "development" ? false : true,
        httpOnly: process.env.NODE_ENV === "development" ? false : true,
        sameSite: process.env.NODE_ENV === "development" ? false : "none",
    });
    return res.status(200).json({ msg: "Logged Out", success: true })
}

export const verifyToken = asyncError(async (req, res, next) => {
    const token = req.cookies["pijjAccessToken"];
    if (!token) return res.status(200).json({ msg: "Not Logged In" });
    jwt.verify(token, process.env.JWT_SECRET, (err, id) => {
        if (err) return next(new ErrorHandler("You are not authorized", 401));

        req.user = id;
        next();
    });
});

// IsAuthenticated -  checks whether user is logged in or not

// IsAdmin - checks whether the user is admin or not
export const isAdmin = async (req, res, next) => {
    if (!req.user.id) {
        return next(new ErrorHandler("Please Login with admin credentials", 401));
    }

    const user = await UserModel.findById(req.user.id);
    if (user.role !== "admin") return next(new ErrorHandler("Admin credentials required", 401));

    req.role = "admin";
    next();
}

export const login = asyncError(async (req, res, next) => {
    if (!req.body.email || !req.body.password) return next(new ErrorHandler("All Fields are mandatory", 400));

    const userExists = await UserModel.findOne({ email: req.body.email });
    if (!userExists) return next(new ErrorHandler("Invalid Email or password", 404));
    const { password, ...others } = userExists._doc;

    const verifiedPass = await bcryptjs.compare(req.body.password, userExists.password);
    if (!verifiedPass) return next(new ErrorHandler("Invalid Email or password", 401));

    const token = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET, {
        expiresIn: "168h"
    });

    res.cookie(String("pijjAccessToken"), token, {
        secure: process.env.NODE_ENV === "development" ? false : true,
        httpOnly: process.env.NODE_ENV === "development" ? false : true,
        sameSite: process.env.NODE_ENV === "development" ? false : "none",
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    });

    return res.status(200).json({ msg: "User Logged In Succesfully", user: others });
});

export const signup = asyncError(async (req, res, next) => {
    if (!req.body.email || !req.body.password || !req.body.name || !req.body.phone) { return new ErrorHandler("All Fields are mandatory", 400); }

    const user = await UserModel.findOne({ email: req.body.email });
    if (user) return next(new ErrorHandler("User Already Present Try Login", 400));

    const phoneExists = await UserModel.findOne({phone : req.body.phone});
    if (phoneExists) return next(new ErrorHandler("Phone number already registered", 400));

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);
    // let hashedPassword = 1234567;
    req.body.password = hashedPassword;

    const newUser = new UserModel({ ...req.body });
    const savedUser = await newUser.save();

    // Createing a cartModel for this user
    const { _id } = savedUser._doc;
    const cart = await CartModel.create({ userId: _id });

    const { password, ...others } = savedUser._doc;

    const recieversEmail = req.body.email;
    const subject = "Congratulation 😃😃";
    const text = "🍕 Thanks for signing up to our website . We will ensure you to give a great experience";
    const html = `<div><h2 style='text-align:center;'>Hey.. ${req.body.name} </h2> <br/><h2 style='text-align:center;'>Thanks for signing up to </h2> <br/> <h1 style='color:#fc8019;text-align:center;'>Pijja.com</h1> <br/> <h3 style='text-align:center;'>We will ensure you to give a great experience</h3></div>`;


    sendMailToUser(recieversEmail, subject, text, html);
    if (savedUser && cart) { return res.status(200).json({ msg: "User Created Succesfully", user: others }); }
});

export const forgetPassword = asyncError(async (req, res, next) => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) return next(new ErrorHandler("Email does not exist in our user list", 400));
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "10m"
    });

    const forgetPasswordUrl = `${req.headers.origin}/resetpassword/${token}`;

    const subject = "Reset Password Link";
    const text = "Your Reset Password link is here 😀";
    const htmlBody = `<div><h2 style='text-align:center; color:#fc8019'>Pijja.com</h2><br/><h3 style='text-align:center;'>!!OOps.. ${user?.name} You forget your password 😅😄. <br/> Dont worry visit the given url and reset your password. </h3><br/><h4>Reset Link : ${forgetPasswordUrl}<br/>Expires in 10m</h4></div>`;

    sendMailToUser(user?.email, subject, text, htmlBody);
    return res.status(200).json({
        msg: "Email sent"
    })
});

export const resetpassword = asyncError(async (req, res, next) => {
    const token = req.params.token;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    if (!token) return res.status(200).json({ msg: "User Not Found" });

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) return next(new ErrorHandler("You are not authorized", 401));
        if (password === confirmPassword) {
            const userInfo = await UserModel.findById(user.id);

            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(password, salt);

            userInfo.password = hashedPassword;
            const saved = await userInfo.save();

            if (!saved) return next(new ErrorHandler("Cannot save password please try later"));

            return res.status(200).json({
                msg: "Password reset succesfull try login",
            })
        }
    });
});

