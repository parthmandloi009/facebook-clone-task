import { RequestHandler } from "express";
import { ERROR_CODES, ERROR_MESSAGE, SECRET } from "../constant/appConstant";
import { ERROR, OK } from "../constant/commanFunction";
import users from "../models/user";
import { findOne, save } from "../services/user.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Users } from "../dto/responseInterface";

export const signup: RequestHandler = async (req, res) => {
  const { username, email, phone, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);
    const data = {
      username: username,
      email: email,
      phone: phone,
      password: passwordHashed,
    };

    const result: Promise<Users> = await save(users, data);

    OK(res, result, ERROR_CODES.SUCCESS);
  } catch (error) {
    ERROR(res, ERROR_CODES.FAILURE, ERROR_MESSAGE.SOMETHING_WENT_WRONG);
  }
};

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findOne(users, email);
    !user && ERROR(res, ERROR_CODES.NOT_FOUND, ERROR_MESSAGE.NOT_FOUND);

    const validPassword = await bcrypt.compare(password, user.password);
    !validPassword &&
      ERROR(res, ERROR_CODES.FAILURE, ERROR_MESSAGE.INVALID_PASSWORD);

    const token = jwt.sign({ userId: user._id, email: user.email }, SECRET);
    user.token = token;

    OK(res, user, ERROR_CODES.SUCCESS);
  } catch (error) {
    ERROR(res, ERROR_CODES.FAILURE, ERROR_MESSAGE.SOMETHING_WENT_WRONG);
  }
};
