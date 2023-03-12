import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { JWT_CONFIG } from "@config/keys";
import prisma from "@lib/prisma";
import { ExpressError } from "@lib/ExpressError";

export const createUser = async (
  username: string,
  email: string,
  password: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
  return user;
};

export const authenticateUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new ExpressError("User not found", 404);
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ExpressError("Username or password is incorrect", 401);
  }
  const token = jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    JWT_CONFIG["secret"],
    {
      expiresIn: JWT_CONFIG["expiresIn"],
    }
  );
  return { token, user };
};

export const getUserFromToken = async (token: string) => {
  const decoded = jwt.verify(token, JWT_CONFIG["secret"]) as {
    id: number;
    username: string;
  };
  const user = await prisma.user.findUnique({
    where: {
      id: decoded.id,
    },
  });

  if (!user) {
    throw new ExpressError("User not found", 404);
  }

  return user;
};
