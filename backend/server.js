import app from "./app.js";
import { connectToDB } from "./db.js";
import Razorpay from "razorpay";

app.get("/", (req, res, next) => {
    res.send("<h1>Working</h1>");
})

await connectToDB();

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET
})



app.listen(process.env.PORT, () => {
    console.log("Listening at Port " + process.env.PORT + ` in ${process.env.NODE_ENV} MODE`);
}) 