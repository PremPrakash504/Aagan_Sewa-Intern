import express from "express";
import { addInquiry, addReview, addTrustedCustomer, getInquiry, getReview } from "../controller/site.controller.js";
import { tcustomerImgUpload } from "../utils/multerHandler.js";


const siteRouter = express.Router();
 siteRouter.post("/add-inquiry",addInquiry);
 siteRouter.get("/get-inquiry",getInquiry);
siteRouter.post("/add-review",addReview);
siteRouter.get("/get-review",getReview);
siteRouter.post("/add-trustedCustomer", tcustomerImgUpload.single("tCustomerImg"),addTrustedCustomer)
 export default siteRouter;