import express from "express";
import {addStaff, deleteStaff, getStaff, updateStaff} from "../controller/staff.controller.js";
import { isLogin } from "../middlewares/login.js";
import { authorizeRoles } from "../middlewares/isAuth.js";

const staffRouter = express.Router();
staffRouter.post("/add-staff",isLogin,authorizeRoles("branch_manager"),addStaff);
staffRouter.get("/get-staff",getStaff);
staffRouter.delete("/delete-staff/:staff_id",isLogin,authorizeRoles("branch_manager"),deleteStaff);
staffRouter.patch("/update-staff/:staff_id",isLogin,authorizeRoles("branch_manager"),updateStaff);
export default staffRouter;
