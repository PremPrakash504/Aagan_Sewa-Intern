import express from "express";
import { addGallery, addInquiry, addReview, addTrustedCustomer, getInquiry, getReview, getTrustedCustomer } from "../controller/site.controller.js";
import { Galleries, tcustomerImgUpload } from "../utils/multerHandler.js";
import { isLogin } from "../middlewares/login.js";
import { authorizeRoles } from "../middlewares/isAuth.js";


const siteRouter = express.Router();
 siteRouter.post("/add-inquiry",addInquiry);
 siteRouter.get("/get-inquiry",getInquiry);
siteRouter.post("/add-review",addReview);
siteRouter.get("/get-review",getReview);
siteRouter.post("/add-trustedCustomer", tcustomerImgUpload.single("tCustomerImg"),addTrustedCustomer);
siteRouter.get("/get-trustedCustomer",getTrustedCustomer);
siteRouter.post("/add-gallary",isLogin,authorizeRoles("admin","branch_manager"), Galleries.array("images",20),addGallery);
 export default siteRouter;