export const JWT_CONFIG = {
  secret: process.env.JWT_SECRET || "secret",
  expiresIn: process.env.JWT_EXPIRES || "2d",
};
