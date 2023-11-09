import express from 'express';
import { addProduct } from '../controllers/AdminController.js';
import { isAdmin, verifyToken } from '../controllers/AuthController.js';
import { getAllProducts, getProductDetail } from '../controllers/ProductController.js';
const ProductRouter = express.Router();

ProductRouter.route('/all')
.get(getAllProducts)

ProductRouter.route('/find/:id')
.get(getProductDetail);



export default ProductRouter;