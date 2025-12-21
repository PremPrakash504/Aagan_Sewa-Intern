import express from "express";
import { addStaff } from "../controller/staff.controller.js";


const staffRouter = express.Router();
staffRouter.post("/add-staff",addStaff);

export default staffRouter;
