export const addStaff = async (req, res) => {
  try {
    const {
      name,
      email,
      position,
      password,
      phone,
      role,
      description,
      service_id,
      branch_id,
    } = req.body;
    console.log(req.body);
    console.log(req.file);
    if (!name || !email || !branch_id || phone ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const [branch]= await db.query("SELECT* FROM branch WHERE branch_id=?", [
      branch_id,
    ]);
    if(branch/length==0){
      return res.status(403)({message:"Branch not found"})
    }
    
  } catch (error) {
    console.log("Internal server error occour", error);
  }
};
