import { asyncError } from "../middlewares/error.js";
import ProductModel from "../models/ProductModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const getAllProducts = asyncError(async (req, res, next) => {
    const products = await ProductModel.find();
    if (!products) { return next(new ErrorHandler("Internal server error", 500)); }

    return res.status(200).json({ msg: "Products Fetched Succesfully", products })
});

export const getProductDetail = asyncError(async (req, res, next) => {
    const product = await ProductModel.findById(req.params.id);
    if (!product) return next(new ErrorHandler("Cannot find product", 500));

    return res.status(200).json({ msg: "Product fetched succesfully", product });
}); 
