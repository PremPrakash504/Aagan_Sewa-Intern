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
    const [rows] = await db.query(`
   SELECT
    p.provience_id,
    p.provience_name,
    GROUP_CONCAT(d.district_name) as district
    
    FROM provience p
    LEFT JOIN district d
      ON p.provience_id= d.provience_id
      GROUP BY p.provience_id, p.provience_name
      `);
    res.status(201).json({
      message: "Successfully retrived all provience name",
      data: rows,
    });
  } catch (error) {
    console.error("Failed to get all data", error);
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
      message:"District added successfully",
    })
    console.log(req.body);
  } catch (error) {
    console.log(error);
  }
};
// get all district
export const getAllDistricts = async (req, res)=>{
  try{
 const[rows] = await db.query("Select* FROM district");
 res.status(200).json({
  mesage:"Successfully retrived all districts",
  data:rows,
  });
  }catch(error){
    console.log("Failed to get all data");
  }
};
// add branch
export const addBranch = async(req, res)=>{
  try{
  const{branch_name,remarks,district_id} = req.body;
  const[existingDistrict] = await db.query(
    "SELECT * FROM district WHERE district_id=?",
    [district_id]
  );
  if(existingDistrict.length==0){
    return res.status(400).json({message:"District does not exist"});
  }
  await db.query(
   "INSERT INTO branch(branch_name,remarks,district_id) VALUES(?,?,?)",
   [branch_name,remarks,district_id] 
  );
  res.status(201).json({message:"Branch added Successfully"});
}catch(error){
  console.log("error",error)
}
};
// get all branch
export const getAllBranches = async(req,res)=>{
 try{
  const[rows] = await db.query(
    "SELECT d.district_name,b.branch_id,b.branch_name,b.remarks FROM branch b LEFT JOIN district d ON b.branch_id=d.district_id"
  );
  res.status(200).json({
    message:"Successfully retrived all branch name",
    data:rows,
  });
 } catch(error){
  console.log(error);
  res.status(500).json({message:"Internal server error"})
 }
};