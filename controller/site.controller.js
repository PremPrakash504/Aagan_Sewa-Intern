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

    // image ko filename ya path matrai save garne
    const tCustomerImgPath = tCustomerImg.filename; 
    // or: tCustomerImg.path

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
