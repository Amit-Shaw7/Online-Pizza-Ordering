import { asyncError } from "../middlewares/error.js";
import OrderModel from "../models/OrderModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { instance } from "../server.js";
import crypto from "crypto";
import PaymentModel from "../models/PaymentModel.js";
import CartModel from "../models/CartModel.js";
import { sendMailToUser } from "../utils/Mail.js";
import UserModel from "../models/UserModel.js";

// Placing Order --------------
export const createCODorder = asyncError(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingCharges,
        totalAmount,
    } = req.body;

    const user = req.user.id;

    const orderOptions = {
        shippingInfo,
        orderItems,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingCharges,
        totalAmount,
        user
    };
    const createdOrder = await OrderModel.create(orderOptions);
    if (!createdOrder) { return next(new ErrorHandler("Cannot create order", 500)); }


    const cart = await CartModel.findOne({ userId: user });
    cart.items = [];
    await cart.save();

    const userInfo = await UserModel.findById(req.user.id);

    const subject = "Order Placed Succesfully 😀😀";
    const text = "Congratulation 😀😀 , Ordered placed succesfully...🍕🍕";

    const html = `<div><h2 style='text-align:center; color:#fc8019;'>Pijja.com</h2><br/><h3 style='text-align:center;'>😀😀 Congratulation.... ${userInfo?.name.split(" ")[0]} your order placed succesfully via COD.</h3><br/><h4 style='text-align:center;'>Amount to be paid on Delivery : ${Math.round(totalAmount)} <br/><h3 style='text-align:center;margin-top:1rem;'><b>I am sure you will love it.. 😎😎</b></h3></h4> </div>`;

    sendMailToUser(userInfo?.email, subject, text, html);

    return res.status(200).json({
        success: true,
        msg: "Order placed succesfully via COD"
    })

});

export const createonlineorder = asyncError(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingCharges,
        totalAmount,
    } = req.body;

    const user = req.user.id;


    const orderOptions = {
        shippingInfo,
        orderItems,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingCharges,
        totalAmount,
        user
    };

    var options = {
        amount: Number(totalAmount) * 100,  // amount in the smallest currency unit
        currency: "INR",
    };

    const order = await instance.orders.create(options);
    if (!order) return next(new ErrorHandler("Cannot place Online order Try COD"));


    return res.status(200).json({
        success: true,
        msg: "Order processed succesfully via ONLINE",
        order,
        orderOptions
    })

});

export const paymentVerification = asyncError(async (req, res, next) => {
    const {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        orderOptions,
        dataRecieved
    } = req.body;

    const body = razorpay_payment_id + "|" + razorpay_order_id;
    const expectedSignatue = crypto.createHmac("sha256", process.env.RAZORPAY_API_SECRET).update(body).digest("hex");

    const isAuthenticatedSign = expectedSignatue === razorpay_signature;
    // const isAuthenticatedSign =  true;
    if (isAuthenticatedSign) {
        const payment = await PaymentModel.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            // amount : orderOptions.totalAmount
        });

        const createdOrder = await OrderModel.create({
            ...orderOptions,
            user: req.user.id,
            shippingInfo: dataRecieved.shippingInfo,
            orderItems: dataRecieved.orderItems,
            paymentMethod: dataRecieved.paymentMethod,
            itemsPrice: dataRecieved.itemsPrice,
            taxPrice: dataRecieved.taxPrice,
            shippingCharges: dataRecieved.shippingCharges,
            totalAmount: dataRecieved.totalAmount,

            paidAt: new Date(Date.now()),
            paymentInfo: payment._id,
        });
        if (!createdOrder) { return next(new ErrorHandler("Cannot create order", 500)); }

        const cart = await CartModel.findOne({ userId: req.user.id });
        cart.items = [];
        await cart.save();

        const userInfo = await UserModel.findById(req.user.id);

        const subject = "Order Placed Succesfully 😀😀";
        const text = "Congratulation 😀😀 , Ordered placed succesfully...🍕🍕";

        const html = `<div><h2 style='text-align:center; color:#fc8019;'>Pijja.com</h2><br/><h3 style='text-align:center;'>😀😀 Congratulation.... ${userInfo?.name.split(" ")[0]} your order placed succesfully via ONLINE Method.</h3><br/><h4 style='text-align:center;'>Amount paid : ${Math.round(dataRecieved.totalAmount)} <br/> <h3 style='text-align:center;margin-top:1rem;'><b>I am sure you will love it.. 😎😎</b></h3></h4> </div>`;

        sendMailToUser(userInfo?.email, subject, text, html);
        return res.status(200).json({
            success: true,
            msg: "Order Placed Successfully. Payment ID : " + payment._id
        });

    } else {
        return next(new ErrorHandler("Payment failed signature mismatch", 400))
    }
});

export const getmyOrders = asyncError(async (req, res, next) => {
    const orders = await OrderModel.find({ user: req.user.id });
    if (!orders) next(new ErrorHandler("No orders found", 404));

    return res.status(200).json({
        msg: "Orders fetchjed succesfully",
        orders
    })
});

export const getOrderDetails = asyncError(async (req, res, next) => {
    const order = await OrderModel.findById(req.params.id);
    if (!order) { return next(ErrorHandler("Internal server error")); }

    return res.status(200).json({ msg: "Order Details fetched succesfully", order });
})



// ---------------- Needs User Authorization ----------------

// Get all orders of logged in user ---------------
export const getAllOrder = asyncError(async (req, res, next) => {
    const allOrders = await OrderModel.find({
        user: req.user._id
    });

    return res.status(200).json({
        success: true,
        allOrders
    })
});

// Get logged in order details
export const orderDetails = asyncError(async (req, res, next) => {
    const order = await OrderModel.findById(req.params.id);
    if (!order) return next(new ErrorHandler("Not Found", 404));

    return res.status(200).json({
        msg: "Order fetched succesfully",
        order
    })
});


