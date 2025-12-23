import db from "../config/db.connect.js";

export const addStaff = async (req, res) => {
  try {
    const { name, email, password, phone, branch_id } = req.body;
    if (!name || !email || !password || !phone || !branch_id) {
      return res.status(400).json({ message: "All feilds are required" });
    }
    const [branch] = await db.query("SELECT* FROM branch WHERE branch_id=?", [
      branch_id,
    ]);
    if (branch.length === 0) {
      return res.status(400).json({ message: "Branch does not exists" });
    }
    const [existingStaff] = await db.query("SELECT *FROM staff WHERE email=?", [
      email,
    ]);
    if (existingStaff.length > 0) {
      return res.status(400).json({ message: "Staff already exists" });
    }
    await db.query(
      "INSERT INTO staff(name,email,password,phone,branch_id) VALUES (?,?,?,?,?)",
      [name, email, password, phone, branch_id]
    );
    return res.status(201).json({ message: "Staff added successfully" });
  } catch (error) {
    console.log(error);
  }
};
export const getStaff = async(req,res)=>{
  try{
    const[rows] = await db.query(
      "SELECT* FROM staff"
    );
    return res.status(200).json({message:"Successfully retrived all staff ",data:rows})
  }catch(error){
    console.log(error);
  }
}