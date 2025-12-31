import express from "express";
import dotenv from "dotenv";
import db from "./config/db.connect.js";
import branchRouter from "./routes/branchroutes.js";
import serviceRouter from "./routes/serviceroutes.js";
import staffRouter from "./routes/staffroutes.js";
import authRouter from "./routes/authroutes.js";
import cookieParser from "cookie-parser";
import siteRouter from "./routes/siteroutes.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/branch", branchRouter);
app.use("/api/services", serviceRouter);
app.use("/api/staff", staffRouter);
app.use("/api/auth", authRouter);
app.use("/api/site", siteRouter);

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
