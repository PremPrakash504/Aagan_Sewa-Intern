import express from "express";
import {
  addBranch,
  addDistrict,
  addProvience,
  getAllBranches,
  getAllDistricts,
  getALLProvience,
} from "../controller/branchcontroller.js";
const branchRouter = express.Router();
branchRouter.post("/add-provience", addProvience);
branchRouter.get("/get-provience", getALLProvience);
branchRouter.post("/add-district", addDistrict);
branchRouter.get("/get-district",getAllDistricts);
branchRouter.post("/add-branch",addBranch);
branchRouter.get("/get-branch",getAllBranches);

export default branchRouter;
