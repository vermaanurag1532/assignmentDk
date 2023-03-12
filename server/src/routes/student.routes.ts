import { Router } from "express";
import multer from "multer";

import {
  downloadStudents,
  getAllStudents,
  uploadStudents,
} from "@controllers/student.controller";
import { catchAsync } from "@lib/catchAsync";
import { isAuth } from "@middlewares/isAuth";

const upload = multer({ dest: "uploads/" });
const studentRouter = Router();

studentRouter.get("/", isAuth, catchAsync(getAllStudents));
studentRouter.post(
  "/upload",
  isAuth,
  upload.single("studentsData"),
  catchAsync(uploadStudents)
);
studentRouter.get("/download", catchAsync(downloadStudents));

export default studentRouter;
