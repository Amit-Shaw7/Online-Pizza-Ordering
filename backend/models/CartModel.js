import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
            },
            qty: {
                type: Number,
                default: 0,
            },
            price: {
                type: Number,
            },
            title: {
                type: String
            }
        }
    ]
}, { timestamps: true });

const CartModel = mongoose.model("Cart", CartSchema);
export default CartModel;