import { asyncError } from "../middlewares/error.js";
import CartModel from "../models/CartModel.js";
import ProductModel from "../models/ProductModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const addToCart = asyncError(async (req, res, next) => {
    const cart = await CartModel.findOne({ userId: req.user.id });

    let alreadyExist = false;

    for (let i = 0; i < cart.items.length; i++) {
        if (cart.items[i].productId.valueOf() === req.body.productId) {
            alreadyExist = true;
            break;
        }
    }
    if (alreadyExist) return next(new ErrorHandler("Already Present ", 200));


    cart.items.push({ productId: req.body.productId, qty: req.body.qty, title: req.body.title, price: req.body.price });
    const saved = await cart.save();
    if (!saved) { return next(new ErrorHandler("Cannot add to cart")); }
    return res.status(200).json({
        msg: "Added Succesfully",
        cart
    })
});

export const removeFromCart = asyncError(async (req , res , next) => {
    const cart = await CartModel.findOne({ userId: req.user.id });

    let exists = false;

    for (let i = 0; i < cart.items.length; i++) {
        if (cart.items[i].productId.valueOf() === req.body.productId) {
            exists = true;
            break;
        }
    }
    if (!exists) return next(new ErrorHandler("Item not found in cart ", 200));


    const index = cart.items.indexOf({ productId: req.body.productId});
    cart.items.splice(index , 1);
    const saved = await cart.save();
    if (!saved) { return next(new ErrorHandler("Cannot add to cart")); }
    return res.status(200).json({
        msg: "Removed Succesfully",
        cart
    }) 
})

export const getCartItems = asyncError(async (req, res, next) => {
    const cart = await CartModel.findOne({ userId: req.user.id });
    const { items } = cart._doc;
    if (items.length === 0) { return res.status(200).json({ msg: "No Items found", items: [] }) }

    return res.status(200).json({ msg: "All Items retrieved", items });
});

export const getProductById = asyncError(async (req, res, next) => {
    const product = await ProductModel.findById(req.params.id);
    if (!product) { return next(new ErrorHandler("No Product Found", 404)); }

    return res.status(200).json({ msg: "Product fetched succesfully", product });
});

export const getCartItemCount = asyncError(async (req, res, next) => {
    const cart = await CartModel.findOne({ userId: req.user.id });
    if (!cart) return res.status(200).json({ msg: "Successfully Fetched Total Cart Items", totalItems: 0 });

    const totalItems = cart.items.length;
    return res.status(200).json({ msg: "Successfully Fetched Total Cart Items", totalItems });
});

export const incrementQty = asyncError(async (req, res, next) => {
    const cart = await CartModel.findOne({ userId: req.user.id });
    if (!cart) return next(new ErrorHandler("Internal server error", 500));

    for (let i = 0; i < cart.items.length; i++) {
        if (cart.items[i].productId === req.body.id) {
            cart.items[i].qty += 1;
        }
    }

    return res.status(200).json({ msg: "Qty increased succesfully" });
})
export const decremmentQty = asyncError(async (req, res, next) => {
    const cart = await CartModel.findOne({ userId: req.user.id });
    if (!cart) return next(new ErrorHandler("Internal server error", 500));

    for (let i = 0; i < cart.items.length; i++) {
        if (cart.items[i].productId === req.body.id) {
            cart.items[i].qty -= 1;
        }
    }

    return res.status(200).json({ msg: "Qty increased succesfully" });
})