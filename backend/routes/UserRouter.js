import express from 'express';
import { verifyToken } from '../controllers/AuthController.js';
import { myProfile, updateUser } from '../controllers/UserController.js';
const UserRouter = express.Router();

UserRouter.route("/me")
    .get(verifyToken, myProfile)
    .put(verifyToken, updateUser);

export default UserRouter;