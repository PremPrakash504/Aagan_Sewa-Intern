import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../config/db.connect.js";

export const authLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Comment 1: Validate required credentials
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }
    console.log(email)
    // Comment 2: Fetch user by email from the database
    const [user] = await db.query("SELECT* FROM users WHERE email=?", [email]);
    console.log(user);

    if (user.length == 0) {
      return res.status(400).json({ message: "user not available" });
    }
    const userData = user[0];

    // Comment 3: Verify provided password matches stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, userData.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invaild Credentails" });
    }
    // Comment 4: Sign JWT and set it as an httpOnly cookie for authentication
    const token = jwt.sign(
      {
        id: userData.user_id,
        email: userData.email,
        role: userData.role,
        branch_id: userData.branch_id,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.EXPIRE }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "Login Successful",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};
export const signout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status.json({ message: "signout successfull" });
  } catch (error) {
    return res.status(400).json({ message: "server error", error });
  }
};
export const addBranchManager = async (req, res) => {
  try {
    const { email, password, branch_id } = req.body;
    if (!email || !password || !branch_id) {
      return res.status.json({
        message: "Email,password, branch_id is required",
      });
    }
    const [branch] = await db.query("SELECT* FROM branch WHERE branch_id=?", [
      branch_id,
    ]);
    if (branch.length == 0) {
      return res.status(400).json({ message: "branch does not found" });
    }
    const [existingUser] = await db.query("SELECT*FROM users WHERE email=?", [
      email,
    ]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "user already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO users (email,password,branch_id)VALUES(?,?,?)",
      [email, hashPassword, branch_id]
    );
    return res.status(200).json({ message: "Successfully added as manager" });
  } catch (error) {
    console.log("Internal server error", error);
  }
};
export const getBranchManager = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT user_id,email,role,branch_id FROM users"
    );
    return res
      .status(200)
      .json({ message: "Successfully retrived all users ", data: rows });
  } catch (error) {
    console.log("Internal Server error", error);
  }
};
