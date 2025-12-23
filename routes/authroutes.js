import express from "express";
import {
  addBranchManager,
  authLogin,
  getBranchManager,
  signout,
} from "../controller/auth.controller.js";
import { isLogin } from "../middlewares/login.js";
import { authorizeRoles } from "../middlewares/isAuth.js";

const authRouter = express.Router();
authRouter.post("/login", authLogin);
authRouter.post("/signout", signout);
authRouter.post(
  "/add-branchManager",
  isLogin,
  authorizeRoles("admin"),
  addBranchManager
);
authRouter.get("/get-branchManager", getBranchManager);

export default authRouter;
