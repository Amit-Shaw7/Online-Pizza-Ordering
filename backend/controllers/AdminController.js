import { asyncError } from "../middlewares/error.js";
import OrderModel from "../models/OrderModel.js";
import ProductModel from "../models/ProductModel.js";
import UserModel from "../models/UserModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";

// For Admin only
export const allUsers = asyncError(async (req, res, next) => {
    const Users = await UserModel.find();

    return res.status(200).json({
        msg: "All user fetched succesfully",
        Users
    })
});

export const getStats = asyncError(async (req, res, next) => {
    const userCount = await UserModel.countDocuments();

    const orders = await OrderModel.find({

    });

    const preparingOrders = orders.filter((item) => item.orderStatus === "Preparing");
    const shippedOrders = orders.filter((item) => item.orderStatus === "Shipped");
    const deliveredOrders = orders.filter((item) => item.orderStatus === "Delivered");

    let totalIncome = 0;

    orders.forEach(i => {
        totalIncome += i.totalAmount;
    });

    return res.status(200).json({
        msg: "Stats fetched succesfully",
        userCount,
        ordersCount: {
            totalOrders: orders.length,
            preparing: preparingOrders.length,
            shipped: shippedOrders.length,
            delivered: deliveredOrders.length
        },
        totalIncome,
        success: true,
    })
});

// -------------- Needs Admin Authorization -----------------
// Get all user orders 
export const allOrder = asyncError(async (req, res, next) => {
    const allOrders = await OrderModel.find();

    return res.status(200).json({
        success: true,
        allOrders
    })
});
// Change Order Status
export const changeOrderStatus = asyncError(async (req, res, next) => {
    let status = '';
    const order = await OrderModel.findById(req.params.id);
    if (!order) return next(new ErrorHandler("Not Found", 404));

    if (order.orderStatus === "Delivered") return next(new ErrorHandler("Item already delivered", 400));
    else if (order.orderStatus == "Preparing") {
        order.orderStatus = "Shipped";
        status = "Shipped";
    }
    else if (order.orderStatus == "Shipped") {
        order.orderStatus = "Delivered";
        status = "Delivered";
        order.deliveredAt = new Date(Date.now());
    };

    await order.save();

    return res.status(200).json({
        success: true,
        msg: `Order Status updated to ${status}`
    })
});

export const addProduct = asyncError(async (req, res, next) => {
    const user = await UserModel.findById(req.user.id);
    if (!user) return next(new ErrorHandler("You are not authorized", 401));

    if (user.role !== "admin") return next(new ErrorHandler("Admin credential required", 401));

    const newProduct = await ProductModel.create({
        title: req.body.title,
        price: req.body.price,
        photoUrl: req.body.photoUrl
    });

    if (!newProduct) return next(new ErrorHandler("Cannot add this product", 500));

    return res.status(200).json({
        msg: "Product Created succesfully",
        newProduct
    })
});

export const updateProduct = asyncError(async (req, res, next) => {
    const user = await UserModel.findById(req.user.id);
    if (!user) return next(new ErrorHandler("You are not authorized", 401));

    if (user.role !== "admin") return next(new ErrorHandler("Admin credential required", 401));


    const product = await ProductModel.findById(req.params.id);

    product.title = req.body.title;
    product.price = req.body.price;
    if (req.body.photoUrl) {
        product.photoUrl = req.body.photoUrl;
    }

    const savedProduct = await product.save();

    if (!savedProduct) return next(new ErrorHandler("Cannot update Product", 500));

    return res.status(200).json({
        msg: "Product Updated succesfully",
        savedProduct
    })
});

export const fetchAllProucts = asyncError(async (req, res, next) => {
    const user = await UserModel.findById(req.user.id);
    if (user.role !== "admin") return next(new ErrorHandler("Admin credential required", 401));

    const products = await ProductModel.find();
    if (products.length === 0) {
        return res.status(200).json({
            msg: "No Product found",
            products: []
        })
    }

    if (!products) return next(new ErrorHandler("Cannot fetch Products", 500));

    return res.status(200).json({
        msg: "Products Fetched Successfully",
        products
    })
});

export const fetchProductById = asyncError(async (req, res, next) => {
    const user = await UserModel.findById(req.user.id);
    if (user.role !== "admin") return next(new ErrorHandler("Admin credentials required", 401));

    const product = await ProductModel.findById(req.params.id);
    if (!product) return next(new ErrorHandler("Cannot fetch product ", 404));

    return res.status(200).json({
        msg: "Product Fetched Succesfully",
        product
    })
});

export const deleteProductById = asyncError(async (req, res, next) => {
    const user = await UserModel.findById(req.user.id);
    if (user.role !== "admin") return next(new ErrorHandler("Admin credentials required", 401));

    const product = await ProductModel.findById(req.params.id);
    if (!product) return next(new ErrorHandler("Cannot fetch product ", 404));

    const deletedPProduct = await ProductModel.findByIdAndDelete(req.params.id);
    if (!deletedPProduct) return next(new ErrorHandler("Cannot Delete Product", 500));


    return res.status(200).json({
        msg: "Product Fetched Succesfully",
    })
})