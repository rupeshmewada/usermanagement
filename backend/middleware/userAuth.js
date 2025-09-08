import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    // console.log(token);

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

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
