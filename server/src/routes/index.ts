import { Router } from "express";

import authRouter from "@routes/auth.routes";
import studentRouter from "@routes/student.routes";

const indexRouter = Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/student", studentRouter);

// 404
indexRouter.all("*", (req, res) => {
  res.status(404).json({ message: "API endpoint not found", error: true });
});

export default indexRouter;
