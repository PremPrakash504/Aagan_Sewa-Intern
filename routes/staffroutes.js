import express from "express";
import {addStaff, getStaff} from "../controller/staff.controller.js";
import { isLogin } from "../middlewares/login.js";
import { authorizeRoles } from "../middlewares/isAuth.js";

const staffRouter = express.Router();
staffRouter.post("/add-staff",isLogin,authorizeRoles("branch_manager"),addStaff);

export default staffRouter;
