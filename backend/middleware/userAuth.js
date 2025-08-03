import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// import dotenv from "dotenv";
// dotenv.config();
// user authentication middleware
const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODVkY2VmZTcwOWM1ZjZkZDk5ZTUzZSIsImlhdCI6MTc1MzYwMzMxMX0.tZW9NygzvCNrSiyPbAbC6hRAFbjoR5oGiZCuR24KDrY";

    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }
  
    if (!process.env.JWT_SECRET) {
      return res.json({
        success: false,
        message: "JWT secret is not defined in environment variables",
      });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
   
    req.body._id = token_decode.id;
    // console.log(req.body._id);

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
