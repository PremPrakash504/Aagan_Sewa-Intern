import express from "express";
import { isLogin } from "../middlewares/login.js";
import { authorizeRoles } from "../middlewares/isAuth.js";
import {
  addBranch,
  addDistrict,
  addProvience,
  getAllBranches,
  getAllDistricts,
  getALLProvience,
} from "../controller/branch.controller.js";
const branchRouter = express.Router();
branchRouter.post("/add-provience", isLogin, authorizeRoles("admin"), addProvience);
branchRouter.get("/get-provience", getALLProvience);
branchRouter.post("/add-district",isLogin,authorizeRoles("admin"),  addDistrict);
branchRouter.get("/get-district/:provience_id",getAllDistricts);
branchRouter.post("/add-branch",isLogin,authorizeRoles("admin,branch_manager"),addBranch);
branchRouter.get("/get-branch",getAllBranches);

export default branchRouter;
