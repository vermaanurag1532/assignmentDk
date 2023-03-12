import { Router } from "express";

import { catchAsync } from "@lib/catchAsync";
import { registerUser, loginUser } from "@controllers/auth.controller";

const authRouter = Router();

authRouter.post("/register", catchAsync(registerUser));
authRouter.post("/login", catchAsync(loginUser));

export default authRouter;
