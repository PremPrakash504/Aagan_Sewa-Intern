import db from "../config/db.connect.js";
//add inquery
export const addInquiry = async (req, res) => {
  try {
    const { name, phone, address, description, branch_id } = req.body;
    if (!name || !phone || !address || !description || !branch_id) {
      return res.status(400).json({ message: "All fileds are required" });
    }
    const [existingbranch] = await db.query(
      "SELECT * FROM branch WHERE branch_id=?",
      [branch_id]
    );
    if (existingbranch.length == 0) {
      return res.status(400).json({ message: "This branch does not exist" });
    }
    await db.query(
      "INSERT INTO inquiry(name, phone, address, description, branch_id) VALUES (?,?,?,?,?)",
      [name, phone, address, description, branch_id]
    );
    return res.status(200).json({ message: "Your inquery is uploaded" });
  } catch (error) {
    console.log(error);
  }
};
// get inquery
export const getInquiry = async (req, res) => {
  try {
    const [row] = await db.query(`SELECT 
  i.inquiry_id,
  i.name,
  i.phone,
  i.email,
  i.address,
  i.description,
  b.branch_id,
  b.branch_name
FROM inquiry i
LEFT JOIN branch b
  ON i.branch_id = b.branch_id
`);

    res.status(201).json({ message: "Inquiry retrive Sucessfully", data: row });
  } catch (error) {
    console.log(error);
  }
};
// delete inquery
export const deleteInquiry = async (req, res) => {
  try {
    const { inquiry_id } = req.params;
    const managerBranchId = req.user.branch_id;

    if (!inquiry_id) {
      return res.status(400).json({ message: "Inquiry id required" });
    }
    const [inquiry] = await db.query(
      "SELECT * FROM inquiry WHERE inquiry_id=?",
      [inquiry_id]
    );

    if (inquiry.length === 0) {
      return res.status(404).json({ message: "Inquiry not found" });
    }
    if (inquiry[0].branch_id !== managerBranchId) {
      return res
        .status(403)
        .json({ message: "You can delete only your branch inquiries" });
    }
    await db.query(
      "DELETE FROM inquiry WHERE inquiry_id=?",
      [inquiry_id]
    );

    return res.status(200).json({
      message: "Inquiry deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// add review
export const addReview = async (req, res) => {
  try {
    const { name, star, description, branch_id } = req.body;
    if (!name || !star || !description || !branch_id) {
      return res.status(401).json({ message: "please fill all credentials" });
    }

    const [branchExists] = await db.query(
      "SELECT branch_id FROM branch WHERE branch_id = ?",
      [branch_id]
    );
    if (branchExists.length === 0) {
      return res.status(404).json({ message: "Branch does not exist" });
    }

    await db.query(
      "INSERT INTO review( name,star ,description ,branch_id) values (?,?,?,?) ",
      [name, star, description, branch_id]
    );
    res.status(201).json({ message: "Review Added Successfully" });
  } catch (error) {
    console.log(error);
  }
};

// get review
export const getReview = async (req, res) => {
  try {
    const [row] = await db.query(`select
      r.name,
      r.star,
      r.description,
      b.branch_id,
      b.branch_name
      from review r
      left join branch b
      on r.branch_id=b.branch_id
      
      `);
    res
      .status(201)
      .json({ message: "Review retrived successfully", data: row });
  } catch (error) {
    console.log(error);
  }
};
// add trusted customer
export const addTrustedCustomer = async (req, res) => {
  try {
    const { name } = req.body;
    const tCustomerImg = req.file;

    if (!name || !tCustomerImg) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const tCustomerImgPath = tCustomerImg.filename;
    await db.query(
      "INSERT INTO trusted_Customer (name, trusted_Customer_image) VALUES (?, ?)",
      [name, tCustomerImgPath]
    );

    res.status(200).json({ message: "Trusted customer added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// get trusted customer
export const getTrustedCustomer = async (req, res) => {
  try {
    const [row] = await db.query("SELECT * FROM trusted_Customer");
    res
      .status(200)
      .json({ message: "Successfully retrived trusted customer", data: row });
  } catch (error) {
    console.log(error);
  }
};
//  add gallary
export const addGallery = async (req, res) => {
  try {
    const { title, branch_id } = req.body;
    const images = req.files;

    if (!title || !branch_id) {
      return res.status(400).json({ message: "Title and branch_id required" });
    }

    if (!images || images.length === 0) {
      return res.status(400).json({ message: "Images required" });
    }

    const [branch] = await db.query("SELECT * FROM branch WHERE branch_id=?", [
      branch_id,
    ]);

    if (branch.length === 0) {
      return res.status(404).json({ message: "Branch not found" });
    }

    const uploadedBy = req.user.id;
    const userRole = req.user.role;
    const userBranchId = req.user.branch_id;

    if (userRole === "branch_manager") {
      if (parseInt(branch_id) !== userBranchId) {
        return res.status(403).json({
          message:
            "Branch managers can upload gallery only for their own branch",
        });
      }
    }

    for (let img of images) {
      await db.query(
        `INSERT INTO gallery (title, image_path, branch_id, uploaded_by)
         VALUES (?,?,?,?)`,
        [title, img.path, branch_id, uploadedBy]
      );
    }

    return res.status(201).json({
      message: "Gallery images uploaded successfully",
    });
  } catch (error) {
    console.log("Gallery upload error", error);
    res.status(500).json({ message: "Server error" });
  }
};
// get gallery on role based
export const getGallery = async (req, res) => {
  try {
    const { role, branch_id: userBranchId } = req.user;

    let query = `
      SELECT
        g.gallery_id,
        g.title,
        g.image_path,
        g.branch_id,
        b.branch_name,
        g.uploaded_by
      FROM gallery g
      LEFT JOIN branch b
        ON g.branch_id = b.branch_id
    `;

    const params = [];

    // branch manager restriction
    if (role === "branch_manager") {
      query += " WHERE g.branch_id = ?";
      params.push(userBranchId);
    }

    query += " ORDER BY g.gallery_id DESC";

    const [rows] = await db.query(query, params);

    res.status(200).json({
      message: "Gallery fetched successfully",
      data: rows,
    });
  } catch (error) {
    console.log("Get gallery error", error);
    res.status(500).json({ message: "Server error" });
  }
};
// get all gallery
export const getAllGallery = async (req, res) => {
  try {
    let { provience_id, district_id, branch_id } = req.query;

    // empty string -> null
    district_id = district_id || null;
    branch_id = branch_id || null;

    let query = "";
    let params = [];

    // Province selected → return districts
    if (provience_id && !district_id && !branch_id) {
      query = "SELECT * FROM district WHERE provience_id = ?";
      params = [provience_id];

      // Province + District selected → return branches
    } else if (provience_id && district_id && !branch_id) {
      query = "SELECT * FROM branch WHERE district_id = ?";
      params = [district_id];

      // Province + District + Branch selected → return gallery
    } else if (provience_id && district_id && branch_id) {
      query = `
        SELECT 
          g.gallery_id,
          g.title,
          g.image_path,
          g.created_at,
          g.uploaded_by,
          b.branch_name
        FROM gallery g
        LEFT JOIN branch b ON g.branch_id = b.branch_id
        WHERE g.branch_id = ?
        ORDER BY g.gallery_id DESC
      `;
      params = [branch_id];
    } else {
      return res.status(400).json({
        message: "Invalid query parameters",
      });
    }

    const [results] = await db.query(query, params);

    res.status(200).json({
      message: "Gallery data fetched successfully",
      data: results,
    });
  } catch (error) {
    console.log("Get all gallery error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
