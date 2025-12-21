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
    if (!name || !email) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
  } catch (error) {
    console.log("Internal server error occour", error);
  }
};
