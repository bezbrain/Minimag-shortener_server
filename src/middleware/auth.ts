import { NextFunction, Request, Response } from "express";
import { revokedToken } from "../controllers/auth.controller";
import UnauthenticatedError from "../errors/unauthenticated";
import ForbiddenError from "../errors/forbidden";
import jwt, { JwtPayload } from "jsonwebtoken";

interface TokenPayload extends JwtPayload {
  userId: string;
  username: string;
  email: string;
}

const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const {
    headers: { authorization },
  } = req;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthenticatedError("You are not authenticated");
  }

  const extractToken = authorization.split(" ")[1];

  if (revokedToken.includes(extractToken)) {
    throw new ForbiddenError("Forbidden: Token has been revoked");
  }

  try {
    const payload = jwt.verify(
      extractToken,
      process.env.JWT_SECRET as string
    ) as TokenPayload;
    const { userId, username, email } = payload;
    req.user = { userId, username, email };
    next();
  } catch {
    throw new UnauthenticatedError("Not authorized to access this route");
  }
};

export default authMiddleware;
