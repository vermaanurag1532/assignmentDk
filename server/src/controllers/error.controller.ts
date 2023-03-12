import { Request, Response, NextFunction } from "express";

import { ExpressError } from "@lib/ExpressError";

export const ErrorController = async (
  err: ExpressError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err) {
    res.status(err.status || 500).json({
      status: "error",
      message: err.message,
    });
  }
};
