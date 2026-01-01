import db from "../config/db.connect.js";
// add provience
export const addProvience = async (req, res) => {
  const { provience_name } = req.body;
  try {
    const [existingProvience] = await db.query(
      "SELECT provience_name FROM provience WHERE provience_name = ?",
      [provience_name]
    );

    if (existingProvience.length > 0) {
      return res.status(400).json({ mesaage: "Provience already exists" });
    }
    await db.query("INSERT INTO provience (provience_name) VALUES(?)", [
      provience_name,
    ]);
    res.status(201).json({
      message: "Provience added successfully",
    });
  } catch (error) {
    console.log("Failed to add provience", error);
  }
};
// get all provience
export const getALLProvience = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT *FROM provience");
    res.status(201).json({
      message: "Successfully retrived all provience name",
      data: rows,
    });
  } catch (error) {
    console.error("Failed to get all data", error);
  }
};

// delete provience
export const deleteProvience = async (req, res) => {
  const { id } = req.params;

  try {
    const [existingProvience] = await db.query(
      "SELECT provience_id FROM provience WHERE provience_id = ?",
      [id]
    );

    if (existingProvience.length === 0) {
      return res.status(404).json({
        message: "Provience does not exist",
      });
    }

    const [result] = await db.query(
      "DELETE FROM provience WHERE provience_id = ?",
      [id]
    );

    res.status(200).json({
      message: `Provience deleted successfully with id ${id}`,
    });
  } catch (error) {
    console.error("Failed to delete provience", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// add district
export const addDistrict = async (req, res) => {
  try {
    const { district_name, provience_id } = req.body;
    const [existingProvience] = await db.query(
      "SELECT* FROM provience WHERE provience_id=?",
      [provience_id]
    );
    if (existingProvience.length === 0) {
      return res.status(400).json({ message: "Provience doesnot exist" });
    }

    const [existingDistrict] = await db.query(
      "SELECT *FROM district WHERE district_name=?",
      [district_name]
    );
    if (existingDistrict.length > 0) {
      return res.status(400).json({ message: "District already exists" });
    }
    await db.query(
      "INSERT INTO district (district_name,provience_id) VALUES(?,?)",
      [district_name, provience_id]
    );
    res.status(201).json({
      message: "District added successfully",
    });
    console.log(req.body);
  } catch (error) {
    console.log(error);
  }
};
// get district
export const getAllDistricts = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM district");
    res.status(200).json({
      message: "Sucesssfully retrieved all districts",
      data: rows,
    });
  } catch (error) {
    console.error("Failed to get all data", error);
  }
};
// delete district
export const deleteDistrict = async (req, res) => {
  const { id } = req.params;

  try {
    const [existingDistrict] = await db.query(
      "SELECT district_id FROM district WHERE district_id = ?",
      [id]
    );

    if (existingDistrict.length === 0) {
      return res.status(404).json({
        message: "District does not exist",
      });
    }

    const [result] = await db.query(
      "DELETE FROM district WHERE district_id = ?",
      [id]
    );

    res.status(200).json({
      message: `District deleted successfully with id ${id}`,
    });
  } catch (error) {
    console.error("Failed to delete district", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
// add branch
export const addBranch = async (req, res) => {
  try {
    const { branch_name, remarks, district_id } = req.body;
    const [existingDistrict] = await db.query(
      "SELECT * FROM district WHERE district_id=?",
      [district_id]
    );
    if (existingDistrict.length == 0) {
      return res.status(400).json({ message: "District does not exist" });
    }
    const [existingbranch] = await db.query(
      "SELECT* FROM branch WHERE branch_id=?",
      [branch_name]
    );
    if (existingbranch > 0) {
      return res.status(400).json({ message: "This branch already exists" });
    }

    await db.query(
      "INSERT INTO branch(branch_name,remarks,district_id) VALUES(?,?,?)",
      [branch_name, remarks, district_id]
    );
    res.status(201).json({ message: "Branch added Successfully" });
  } catch (error) {
    console.log("error", error);
  }
};
// get branch by district
export const getAllBranches = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT d.district_name,b.branch_id,b.branch_name,b.remarks FROM branch b LEFT JOIN district d ON b.district_id=d.district_id"
    );
    res.status(200).json({
      message: "sucessfully retrieved all branch name",
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// delete branch
export const deleteBranch = async (req, res) => {
  const { id } = req.params;

  try {
    const [existingBranch] = await db.query(
      "SELECT branch_id FROM branch WHERE branch_id = ?",
      [id]
    );

    if (existingBranch.length === 0) {
      return res.status(404).json({
        message: "Branch does not exist",
      });
    }

    const [result] = await db.query("DELETE FROM branch WHERE branch_id = ?", [
      id,
    ]);

    res.status(200).json({
      message: `Branch deleted successfully with id ${id}`,
    });
  } catch (error) {
    console.error("Failed to delete branch", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
// update branch
export const updateBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const { branch_name, district_id, remarks } = req.body;

    const [existing] = await db.execute(
      "SELECT * FROM branch WHERE branch_id = ?",
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        message: `Branch not found with id ${id}`,
      });
    }

    const oldbranch = existing[0];
    const updatedBranchName = branch_name || oldbranch.branch_name;
    const updatedDistrictId = district_id || oldbranch.district_id;
    const updatedRemarks = remarks || oldbranch.remarks;

    if (district_id && district_id !== oldbranch.district_id) {
      const [districtExists] = await db.execute(
        "SELECT district_id FROM district WHERE district_id = ?",
        [district_id]
      );
      if (districtExists.length === 0) {
        return res.status(404).json({ message: "District does not exist" });
      }
    }

    if (branch_name && branch_name !== oldbranch.branch_name) {
      const [nameCheck] = await db.execute(
        "SELECT branch_id FROM branch WHERE branch_name = ? AND branch_id != ?",
        [branch_name, id]
      );
      if (nameCheck.length > 0) {
        return res.status(409).json({
          message: "Branch name already exists",
        });
      }
    }

    await db.execute(
      `UPDATE branch 
       SET branch_name = ?, district_id = ?, remarks = ?
       WHERE branch_id = ?`,
      [updatedBranchName, updatedDistrictId, updatedRemarks, id]
    );

    return res.status(200).json({
      message: "Branch updated successfully",
    });
  } catch (error) {
    console.log("Server error", error);
  }
};
