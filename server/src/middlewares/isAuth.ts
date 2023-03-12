import { Request, Response, NextFunction } from "express";
import { getUserFromToken } from "@services/userService";

import { catchAsync } from "@lib/catchAsync";
import { ExpressError } from "@lib/ExpressError";

export const isAuth = catchAsync(
  async (req: Request, _res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return next(new ExpressError("Not authorized", 401));
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      return next(new ExpressError("Not authorized", 401));
    }

    req.user = await getUserFromToken(token);
    next();
  }
);
