import express from "express";
import cors from "cors";

import { ErrorController } from "@controllers/error.controller";
import indexRouter from "@routes/index";

const app = express();

// Cors
app.use(cors());

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", indexRouter);

// Error handler
app.use(ErrorController);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
