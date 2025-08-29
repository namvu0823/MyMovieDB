import express from "express";
import { registerUser } from "../controllers/db_user.js";
import { loginUser } from "../controllers/db_user.js";
import { verifyToken } from "../middleware/auth.js";
import { getAccountInfor } from "../controllers/db_user.js";
import { updateUser } from "../controllers/db_user.js";

const userRouter= express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/account",verifyToken,getAccountInfor);
userRouter.put("/update_user",verifyToken,updateUser);

export default userRouter;