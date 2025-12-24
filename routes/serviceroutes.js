import express from "express";
import { addService, deleteService, getAllservices } from "../controller/service.controller.js";
import { serviceImgUpload } from "../utils/multerHandler.js";
import { isLogin } from "../middlewares/login.js";
import { authorizeRoles } from "../middlewares/isAuth.js";

const serviceRouter = express.Router();

serviceRouter.post("/add-services",serviceImgUpload.single("img"),isLogin,authorizeRoles("branch_manager"), addService);
serviceRouter.get("/get-services",getAllservices);
serviceRouter.delete("/delete-service/:id", deleteService);

export default serviceRouter;