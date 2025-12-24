import express from "express";
import { addInquiry, addReview, getInquiry, getReview } from "../controller/site.controller.js";


const siteRouter = express.Router();
 siteRouter.post("/add-inquiry",addInquiry);
 siteRouter.get("/get-inquiry",getInquiry);
siteRouter.post("/add-review",addReview);
siteRouter.get("/get-review",getReview);
 export default siteRouter;