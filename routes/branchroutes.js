import express from "express";
import { isLogin } from "../middlewares/login.js";
import { authorizeRoles } from "../middlewares/isAuth.js";
import {
  addBranch,
  addDistrict,
  addProvience,
  deleteBranch,
  deleteDistrict,
  getAllBranches,
  getAllDistricts,
  getALLProvience,
  updateBranch,
} from "../controller/branch.controller.js";
const branchRouter = express.Router();
branchRouter.post(
  "/add-provience",
  isLogin,
  authorizeRoles("admin"),
  addProvience
);
branchRouter.get("/get-provience", getALLProvience);
branchRouter.post(
  "/add-district",
  isLogin,
  authorizeRoles("admin"),
  addDistrict
);
branchRouter.get("/get-district", getAllDistricts);
branchRouter.delete("/delete-district/:district_id",isLogin,authorizeRoles("admin") ,deleteDistrict);
branchRouter.post(
  "/add-branch",
  isLogin,
  authorizeRoles("admin"),
  addBranch
);
branchRouter.get("/get-branch", getAllBranches);
branchRouter.delete("/delete-branch/:branch_id",isLogin,authorizeRoles("admin"),deleteBranch);
branchRouter.patch("/update-branch/:id",isLogin,authorizeRoles("admin"),updateBranch);

export default branchRouter;
