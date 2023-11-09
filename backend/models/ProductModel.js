import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    photoUrl: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

const ProductModel = mongoose.model("Product", ProductSchema);
export default ProductModel;