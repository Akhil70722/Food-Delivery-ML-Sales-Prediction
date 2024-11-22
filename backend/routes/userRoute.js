import express from 'express';
import { getAllUsers, loginUser,registerUser } from '../controllers/userController.js';
const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/",getAllUsers);

export default userRouter;