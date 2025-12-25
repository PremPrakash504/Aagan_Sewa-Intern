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
