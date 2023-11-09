import express, { urlencoded } from 'express';
import dotenv from "dotenv";
import UserRouter from './routes/UserRouter.js';
import AuthRouter from './routes/AuthRouter.js';
import cookieParser from 'cookie-parser';
import { createError } from './middlewares/error.js';
import OrderRouter from './routes/OrderRouter.js';
import cors from 'cors';
import AdminRouter from './routes/AdminRouter.js';
import ProductRouter from './routes/ProductRouter.js';
import CartRouter from './routes/CartRouter.js';
import ContactRouter from './routes/ContactRouter.js';

const app = express();



dotenv.config({
    path: "./config/config.env"
});

// dotenv.config();

// Using Middlewares ------------------------------------
app.use(express.json());
app.use(urlencoded({
    extended: true
}));

app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
}))

app.use("/api/users", UserRouter);
app.use("/api/auths", AuthRouter);
app.use("/api/orders", OrderRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/products", ProductRouter);
app.use("/api/carts", CartRouter);
app.use("/api/contacts", ContactRouter);


// Error Middleware
app.use(createError);

export default app;
