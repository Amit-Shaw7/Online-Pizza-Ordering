import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        required: true,
        type: String,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },

    photo: {
        type: String,
        default: null
    },

    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    address: {
        desc: {
            type: String,
            default: null,
        },
        pincode: {
            type: Number,
            default: null,
        },
        state: {
            type: String,
            default: null,
        },
        pincode: {
            type: String,
            default: null,
        },
    },

}, { timestamps: true });

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;