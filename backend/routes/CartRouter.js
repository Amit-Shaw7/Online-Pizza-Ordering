import express from 'express';
import { verifyToken } from '../controllers/AuthController.js';
import { addToCart, getCartItemCount, getCartItems, getProductById, incrementQty, removeFromCart } from '../controllers/CartController.js';
const CartRouter = express.Router();

CartRouter.route('/addtocart')
    .patch(verifyToken, addToCart)

CartRouter.route('/removefromcart')
    .patch(verifyToken, removeFromCart)

CartRouter.route('/items')
    .get(verifyToken, getCartItems)

CartRouter.route('/product/:id')
    .get(getProductById)

CartRouter.route('/totalitems')
    .get(verifyToken, getCartItemCount)

CartRouter.route('/incrementqty')
    .put(incrementQty);

CartRouter.route('/decrementqty')
    .put(incrementQty);

export default CartRouter;