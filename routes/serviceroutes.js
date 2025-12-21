import express from "express";
import { addService, deleteService, getAllservices } from "../controller/servicecontroller.js";
import { serviceImgUpload } from "../utils/multerHandler.js";

const serviceRouter = express.Router();

serviceRouter.post("/add-services",serviceImgUpload.single("img"), addService);
serviceRouter.get("/get-services",getAllservices);
serviceRouter.delete("/delete-service/:id", deleteService);

export default serviceRouter;