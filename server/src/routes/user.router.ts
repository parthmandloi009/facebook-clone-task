import express from "express";
import {
  deleteUser,
  updateUser,
  getUser,
  getAllUser,
  follow,
  unfollow,
} from "../controller/user.controller";

const router = express.Router();

router.route("/getUser/:id").get(getUser);
router.route("/getAllUser").get(getAllUser);
router.route("/updateUser/:id").put(updateUser);
router.route("/:id/follow").put(follow);
router.route("/:id/unfollow").put(unfollow);
router.route("/deleteUser/:id").delete(deleteUser);

export default router;
