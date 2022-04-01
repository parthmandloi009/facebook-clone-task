import { RequestHandler } from "express";
import { ERROR_CODES, ERROR_MESSAGE } from "../constant/appConstant";
import { ERROR, OK } from "../constant/commanFunction";
import users from "../models/user";
import {
  getOne,
  getManyUser,
  updateOne,
  deleteOne,
} from "../services/user.service";
import bcrypt from "bcrypt";

//update users
export const updateUser: RequestHandler = async (req, res) => {
  const { password, userId } = req.body;
  const id = req.params.id;
  try {
    if (userId === id) {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }

      const data = req.body;
      const result = await updateOne(users, id, data);
      OK(res, result, ERROR_CODES.SUCCESS);
    }
  } catch (error) {
    ERROR(res, ERROR_CODES.FAILURE, ERROR_MESSAGE.SOMETHING_WENT_WRONG);
  }
};

//delete users
export const deleteUser: RequestHandler = async (req, res) => {
  const id = req.params.id;
  try {
    if (id) {
      const result = await deleteOne(users, id);
      OK(res, {}, ERROR_CODES.SUCCESS);
    }
  } catch (error) {
    ERROR(res, ERROR_CODES.FAILURE, ERROR_MESSAGE.SOMETHING_WENT_WRONG);
  }
};

//get a users
export const getUser: RequestHandler = async (req, res) => {
  const id = req.params.id;
  try {
    if (id) {
      const result = await getOne(users, id);
      const { password, updatedAt, ...other } = result._doc;
      OK(res, other, ERROR_CODES.SUCCESS);
    }
  } catch (error) {
    ERROR(res, ERROR_CODES.FAILURE, ERROR_MESSAGE.SOMETHING_WENT_WRONG);
  }
};

//get all users
export const getAllUser: RequestHandler = async (req, res) => {
  try {
    const result = await getManyUser(users);
    OK(res, result, ERROR_CODES.SUCCESS);
  } catch (error) {
    ERROR(res, ERROR_CODES.FAILURE, ERROR_MESSAGE.SOMETHING_WENT_WRONG);
  }
};

//follow a user
export const follow: RequestHandler = async (req, res) => {
  const userId = req.body.userId;
  const id = req.params.id;

  if (userId !== id) {
    try {
      const user = await getOne(users, id);
      const currentUser = await getOne(users, userId);

      if (!user.followers.includes(userId)) {
        await user.updateOne({ $push: { followers: userId } });
        await currentUser.updateOne({ $push: { following: id } });
        OK(res, "", ERROR_CODES.SUCCESS);
      } else {
        ERROR(res, ERROR_CODES.FAILURE, ERROR_MESSAGE.ALREADY_FOLLOW);
      }
    } catch (error) {
      ERROR(res, ERROR_CODES.FAILURE, ERROR_MESSAGE.SOMETHING_WENT_WRONG);
    }
  }
};

//unfollow user
export const unfollow: RequestHandler = async (req, res) => {
  const userId = req.body.userId;
  const id = req.params.id;

  if (userId !== id) {
    try {
      const user = await getOne(users, id);
      const currentUser = await getOne(users, userId);

      if (user.followers.includes(userId)) {
        await user.updateOne({ $pull: { followers: userId } });
        await currentUser.updateOne({ $pull: { following: id } });
        OK(res, ERROR_MESSAGE.SUCCESS, ERROR_CODES.SUCCESS);
      } else {
        ERROR(res, ERROR_CODES.FAILURE, ERROR_MESSAGE.DONT_FOLLOW);
      }
    } catch (error) {
      ERROR(res, ERROR_CODES.FAILURE, ERROR_MESSAGE.SOMETHING_WENT_WRONG);
    }
  }
};
