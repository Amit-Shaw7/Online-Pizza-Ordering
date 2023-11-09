import UserModel from "../models/UserModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { asyncError } from "../middlewares/error.js";

export const myProfile = asyncError(async (req, res, next) => {
    if (!req.user) return next(new ErrorHandler("Your are not loggedIn", 401));

    const user = await UserModel.findById(req.user.id);
    if (!user) return next(new ErrorHandler("Logged out logiin again", 401));
    const { password, ...others } = user._doc;

    return res.status(200).json({
        success: true,
        user: others,
    });
});

export const updateUser = asyncError(async (req, res, next) => {
    const user = await UserModel.findById(req.user.id);
    if (!user) return next(new ErrorHandler("You are not Authorized", 401));

    user.name = req.body.name;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.address.desc = req.body.address;
    user.address.pincode = req.body.pincode;
    if (req.body.photoURL) {
        user.photo = req.body.photoURL;
    }

    const updatedUser = await user.save();
    if (!updatedUser) return next(new ErrorHandler("Internal srever error", 500));

    return res.status(200).json({
        msg: "User updated succesfully",
        user
    });
})
