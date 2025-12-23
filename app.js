import express from "express";
import dotenv from "dotenv";
import db from "./config/db.connect.js";
import branchRouter from "./routes/branchroutes.js";
import serviceRouter from "./routes/serviceroutes.js";
import staffRouter from "./routes/staffroutes.js";
import authRouter from "./routes/authroutes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/branch", branchRouter);
app.use("/api/services", serviceRouter);
app.use("/api/staff", staffRouter);
app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 4000;
try {
  db.connect();
  console.log("Mysql connected successfully");
} catch (error) {
  console.log("My sql connection failed", error.message);
}
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
