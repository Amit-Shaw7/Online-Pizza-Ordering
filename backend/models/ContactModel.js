import mongoose, { Mongoose } from "mongoose";
const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true });

const ContactModel = mongoose.model("Contact", ContactSchema);
export default ContactModel;