import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            default: "INDIA",
        },
        pincode: {
            type: Number,
            required: true,
        },
        phoneNo: {
            type: Number,
            required: true,
        },
    },

    orderItems: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            qty: {
                type: Number,
                required: true,
            }
        }
    ],

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    paymentMethod: {
        type: String,
        enum: ["COD", "ONLINE"],
        default: "COD"
    },

    paymentInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment"
    },

    paidAt: Date,

    itemsPrice: {
        type: Number,
        default: 0,
    },
    taxPrice: {
        type: Number,
        default: 0,
    },
    shippingCharges: {
        type: Number,
        default: 0,
    },
    totalAmount: {
        type: Number,
        default: 0,
    },
    orderStatus: {
        type: String,
        enum: ["Preparing", "Shipped", "Delivered"],
        default: "Preparing"
    },
    deliveredAt: Date,

}, { timestamps: true });

const OrderModel = mongoose.model("Order", OrderSchema);
export default OrderModel;