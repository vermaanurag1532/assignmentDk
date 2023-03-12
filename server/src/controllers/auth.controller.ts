import { Request, Response } from "express";

import { authenticateUser, createUser } from "@services/userService";

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  await createUser(username, email, password);
  const { token, user } = await authenticateUser(email, password);

  res.status(201).json({
    message: "User created successfully",
    token,
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
    },
  });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { token, user } = await authenticateUser(email, password);

  res.status(200).json({
    message: "User logged in successfully",
    token,
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
    },
  });
};
