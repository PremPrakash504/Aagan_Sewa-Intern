import express from "express";
import {
  addGallery,
  addInquiry,
  addReview,
  addTrustedCustomer,
  deleteInquiry,
  getAllGallery,
  getGallery,
  getInquiry,
  getReview,
  getTrustedCustomer,
} from "../controller/site.controller.js";
import { Galleries, tcustomerImgUpload } from "../utils/multerHandler.js";
import { isLogin } from "../middlewares/login.js";
import { authorizeRoles } from "../middlewares/isAuth.js";

const siteRouter = express.Router();
siteRouter.post("/add-inquiry", addInquiry);
siteRouter.get("/get-inquiry",isLogin,authorizeRoles("admin","branch_manager"), getInquiry);
siteRouter.delete("/delete-inquery",isLogin,authorizeRoles("admin","branch_manager"),deleteInquiry);
siteRouter.post("/add-review", addReview);
siteRouter.get("/get-review", getReview);
siteRouter.post(
  "/add-trustedCustomer", isLogin, authorizeRoles("admin","branch_manager"),
  tcustomerImgUpload.single("tCustomerImg"),
  addTrustedCustomer
);
siteRouter.get("/get-trustedCustomer", getTrustedCustomer);
siteRouter.post(
  "/add-gallary",
  isLogin,
  authorizeRoles("admin", "branch_manager"),
  Galleries.array("images", 20),
  addGallery
);
siteRouter.get(
  "/get-gallery",
  isLogin,
  authorizeRoles("admin", "branch_manager"),
  getGallery
);
siteRouter.get("/get-all-gallery", getAllGallery);
export default siteRouter;
