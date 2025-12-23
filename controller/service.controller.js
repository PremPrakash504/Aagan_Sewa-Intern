import db from "../config/db.connect.js";

// add services
export const addService = async (req, res) => {
  try {
    const { service_name, description, branch_id } = req.body;
    const img = req.file;
    if (!service_name || !description || !branch_id) {
      return res.status(400).json({ message: "All feilds are required" });
    }
    const [branch] = await db.query("SELECT* FROM branch WHERE branch_id=?", [
      branch_id,
    ]);
    if (branch.length == 0) {
      return res.status(404).json({ message: "Branch not found" });
    }
    const [existingService] = await db.query(
      "SELECT* FROM services WHERE service_name=?",
      [service_name]
    );
    if (existingService.length > 0) {
      return res.status(400).json({ message: "service already exist" });
    }
    const serviceImgPath = img ? img.path : null;
    await db.query(
      "INSERT INTO services(service_name,description,branch_id,service_image) VALUES(?,?,?,?)",
      [service_name, description, branch_id, serviceImgPath]
    );
    res.status(200).json({
      message: "service added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal server error" });
  }
};
// get services
export const getAllservices = async (req, res) => {
  try {
    const [rows] = await db.query(
      
        "SELECT  * FROM services ",
    );
        res.status(200).json({
    message:"Successfully retrived all services",
    data:rows,
  });
    
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "server error" });
  }
};

//delete service controller
 export const deleteService = async (req, res) => {
  try {
     const { id } = req.params;
     const [service] = await db.query("SELECT * FROM services WHERE service_id = ?", [id]);

     if (service.length === 0) {
       return res.status(404).json({ message: "Service not found" });
     }
     await db.query("DELETE FROM services WHERE service_id=?",[id])
     res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
     console.error("Server error occour", error);
   }
 };
//update service controller
export const updateService = async (req, res) => {
};