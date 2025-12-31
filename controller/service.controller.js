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
    const{provience_id, district_id, branch_id} = req.query;
    let query = "";
    let params = [];
    if(provience_id && !district_id && !branch_id){
      // get district based on provience_id
      query="SELECT * FROM district WHERE provience_id=?";
      params=[provience_id];
    }else if(provience_id && district_id && !branch_id){
      // get branches based on district id
      query="SELECT* FROM branch WHERE district_id=?";
      params=[district_id];
    }else if(provience_id && district_id && branch_id){
      // get services based on branchid
      query="SELECT * FROM services WHERE branch_id=?";
      params=[branch_id];
    }else{
      query="SELECT * FROM services";
    }
    const[results] = await db.query(query, params);
    return res.status(200).json({message:"Successfully retrives service",data:results})

  } catch (error) {
    console.log(error)
  }
};


//delete service controller
export const deleteService = async (req, res) => {
  try {
    const { service_id } = req.params;

    const managerBranchId = req.user.branch_id;

    if (!service_id) {
      return res.status(400).json({ message: "Service id required" });
    }

    const [service] = await db.query(
      "SELECT * FROM services WHERE service_id=?",
      [service_id]
    );

    if (service.length === 0) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (service[0].branch_id !== managerBranchId) {
      return res
        .status(403)
        .json({ message: "You can delete only your branch services" });
    }

    await db.query("DELETE FROM services WHERE service_id=?", [service_id]);

    return res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//update service controller

export const updateService = async (req, res) => {
  try {
    const { service_id } = req.params;
    const { service_name, description } = req.body;
    const img = req.file;

    
    const managerBranchId = req.user.branch_id;

    if (!service_id) {
      return res.status(400).json({ message: "Service id required" });
    }

    
    const [service] = await db.query(
      "SELECT * FROM services WHERE service_id=?",
      [service_id]
    );

    if (service.length === 0) {
      return res.status(404).json({ message: "Service not found" });
    }

    
    if (service[0].branch_id !== managerBranchId) {
      return res
        .status(403)
        .json({ message: "You can update only your branch services" });
    }

    const serviceImgPath = img ? img.path : service[0].service_image;

    await db.query(
      `UPDATE services 
       SET service_name=?, description=?, service_image=? 
       WHERE service_id=?`,
      [service_name, description, serviceImgPath, service_id]
    );

    return res.status(200).json({
      message: "Service updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
