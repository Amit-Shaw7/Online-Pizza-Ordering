import express from "express";
import { addProduct, allOrder, allUsers, changeOrderStatus, deleteProductById, fetchAllProucts, fetchProductById, getStats, updateProduct } from "../controllers/AdminController.js";
import { isAdmin, verifyToken } from "../controllers/AuthController.js";
const AdminRouter = express.Router();

//For Admin Only (Users) 
AdminRouter.get("/users", verifyToken, isAdmin, allUsers);
AdminRouter.get("/stats", verifyToken, isAdmin, getStats);

// For Admin only (Orders) ----------------------------------------------
AdminRouter.get("/allorders", verifyToken, isAdmin, allOrder);
AdminRouter.get("/order/:id", verifyToken, isAdmin, changeOrderStatus);

AdminRouter.post('/product/add', verifyToken, isAdmin, addProduct);
AdminRouter.get('/product/all', verifyToken, isAdmin, fetchAllProucts);
AdminRouter.put('/product/update/:id', verifyToken, isAdmin, updateProduct);
AdminRouter.get('/product/find/:id', verifyToken, fetchProductById);
AdminRouter.delete('/product/delete/:id', verifyToken, isAdmin, deleteProductById);

export default AdminRouter;