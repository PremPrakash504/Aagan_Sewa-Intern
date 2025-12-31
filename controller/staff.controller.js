import db from "../config/db.connect.js";
// add staff
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
// get staff by branch
export const getStaff = async (req, res) => {
  try {
    const { branch_id } = req.query;

    let query = `
      SELECT 
        staff.staff_id,
        staff.name,
        staff.email,
        staff.phone,
        staff.branch_id,
        branch.branch_name
      FROM staff
      LEFT JOIN branch ON staff.branch_id = branch.branch_id
    `;

    let values = [];
    if (branch_id) {
      query += " WHERE staff.branch_id = ?";
      values.push(branch_id);
    }

    const [rows] = await db.query(query, values);

    return res.status(200).json({
      message: "Successfully retrieved staff",
      data: rows
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
// delete staff by branch (branch manager only)
export const deleteStaff = async (req, res) => {
  try {
    const managerBranchId = req.user.branch_id;

    if (!managerBranchId) {
      return res.status(400).json({
        message: "Branch not found for this manager"
      });
    }

    const [staff] = await db.query(
      "SELECT * FROM staff WHERE branch_id = ?",
      [managerBranchId]
    );

    if (staff.length === 0) {
      return res.status(404).json({
        message: "No staff found in your branch"
      });
    }
    await db.query(
      "DELETE FROM staff WHERE branch_id = ?",
      [managerBranchId]
    );

    return res.status(200).json({
      message: "All staff of your branch deleted successfully"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// update staff by branch manager (own branch only)
export const updateStaff = async (req, res) => {
  try {
    const { staff_id } = req.params;
    const { name, email, phone } = req.body;
    const managerBranchId = req.user.branch_id;

    if (!staff_id) {
      return res.status(400).json({ message: "staff_id is required" });
    }

    if (!name && !email && !phone) {
      return res.status(400).json({
        message: "At least one field is required to update"
      });
    }

    // check staff belongs to manager's branch
    const [staff] = await db.query(
      "SELECT * FROM staff WHERE staff_id = ? AND branch_id = ?",
      [staff_id, managerBranchId]
    );

    if (staff.length === 0) {
      return res.status(403).json({
        message: "You are not allowed to update this staff"
      });
    }

    // update staff (only allowed fields)
    await db.query(
      `UPDATE staff 
       SET name = ?, email = ?, phone = ?
       WHERE staff_id = ?`,
      [
        name || staff[0].name,
        email || staff[0].email,
        phone || staff[0].phone,
        staff_id
      ]
    );

    return res.status(200).json({
      message: "Staff updated successfully"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};





