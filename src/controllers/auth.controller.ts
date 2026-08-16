import { Request, Response } from "express";
import UserCollection from "../models/User";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request";
import NotFoundError from "../errors/not-found";
import UnauthenticatedError from "../errors/unauthenticated";

const registerUser = async (req: Request, res: Response) => {
  const { body } = req;
  const user = await UserCollection.create(body);

  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Your registration is successful",
    user: {
      username: user.username,
      email: user.email,
    },
    token,
  });
};

const loginUser = async (req: Request, res: Response) => {
  const {
    body: { username, email, password },
  } = req;

  if ((!username && !email) || !password) {
    throw new BadRequestError("Username or Email or Password cannot be empty");
  }

  const user = await UserCollection.findOne({ $or: [{ email }, { username }] });

  if (!user) {
    throw new NotFoundError("User does not exist");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Incorrect password");
  }

  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Login successful",
    user: {
      username: user.username,
      email: user.email,
    },
    token,
  });
};

export let revokedToken: string[] = [];

const logout = async (req: Request, res: Response) => {
  const {
    headers: { authorization },
  } = req;

  revokedToken.push(authorization ?? "");
  revokedToken = [];

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Logout successful",
  });
};

export { loginUser, registerUser, logout };
