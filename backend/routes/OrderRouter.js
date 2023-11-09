import express from 'express';
import { isAdmin, verifyToken } from '../controllers/AuthController.js';
import { createCODorder, createonlineorder, getAllOrder, getmyOrders, orderDetails, paymentVerification } from '../controllers/OrderController.js';
const OrderRouter = express.Router();

// For Logged in user only -------------------------------------
OrderRouter.post("/createorder", verifyToken, createCODorder);

OrderRouter.post("/createonlineorder", verifyToken, createonlineorder);

OrderRouter.post("/paymentverification", verifyToken, paymentVerification);

OrderRouter.get("/myorders", verifyToken, getmyOrders);

OrderRouter.get("/allorders", verifyToken, isAdmin , getAllOrder);

OrderRouter.get("/:id", verifyToken, orderDetails);

export default OrderRouter