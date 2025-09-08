import { log } from "console";
import UserModel from "../models/todos/user.model.js";
// Hash and verify passwords
import bcrypt from "bcrypt";
// Create and verify secure tokens (JWT)
import jwt from "jsonwebtoken";
// To validate user input
import validator from "validator";
import fs from "fs";
// API to register user

export var saveImage = async (req, res) => {
  try {
    // console.log(req.body);

    const imageFile = req.file;
    // console.log(imageFile);

    const imageData = fs.readFileSync(req.file.path);

    const imageup = await ImageUpload.insertOne({
      name: req.file.originalname,
      image: {
        data: imageData,
        contentType: req.file.mimetype,
      },
    });
    // console.log(imageup);

    // Optional: delete temp file from local storage
    fs.unlinkSync(req.file.path);

    res.status(200).json({ message: imageup });
  } catch (error) {
    // console.error("Upload error:", error);
    res.status(500).json({ message: "Failed to upload image" });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // console.log(req.file);

    if (!username || !password || !email) {
      return res.json({ success: false, message: "Missing Details" });
    }
    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }
    // validating strong password
    if (password.length < 3) {
      return res.json({ success: false, message: "enter a strong password" });
    }
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (!hasLetter || !hasNumber) {
      return res.json({
        success: false,
        message: "Password must contain both letters and numbers.",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const imageFile = req.file;
    // console.log(imageFile);

    const imageData = fs.readFileSync(req.file.path);

    const userData = {
      username,
      email,
      name: req.file.originalname,
      image: {
        data: imageData,
        contentType: req.file.mimetype,
      },
      password: hashedPassword,
    };
    const newUser = new UserModel(userData);

    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    let imageSrc = null;
    if (user.image && user.image.data && user.image.contentType) {
      const base64Image = user.image.data.toString("base64");
      imageSrc = `data:${user.image.contentType};base64,${base64Image}`;
    }

    res.json({ success: true, token, user, imageSrc });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for user login
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await UserModel.findOne({ email });

//     if (!user) {
//       return res.json({ success: false, message: "User does not exist" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (isMatch) {
//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

//       const base64Image = user.image.data.toString("base64");
//       const contentType = user.image.contentType;
//       const dataUrl = `data:${contentType};base64,${base64Image}`;

//       res.json({ success: true, "Content_Type": dataUrl, token, user,  });
//     } else {
//       res.json({ success: false, message: "Invalid Credentials" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      // Convert image buffer to base64 string for frontend display
      let imageSrc = null;
      if (user.image && user.image.data && user.image.contentType) {
        const base64Image = user.image.data.toString("base64");
        imageSrc = `data:${user.image.contentType};base64,${base64Image}`;
      }

      res.json({
        success: true,
        token,
        user: {
          ...user.toObject(),
          imageSrc, // send imageSrc for frontend <img src={imageSrc} />
        },
      });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export var saveUser = async (req, res) => {
  try {
    const { username, email, password, avatar } = req.body;
    // console.log(user);

    const newUser = await UserModel.create({
      username: username, // Or just 'username' if key and value are the same
      email: email,
      password: password,
      avatar: avatar, // In a real app, this would be hashedPassword
    });

    console.log("New user saved:", newUser);

    return res.status(200).json(newUser);
  } catch (error) {
    console.error("Error saving data:", error);
    return res
      .status(500)
      .json({ message: "Failed to retrieve data", error: error.message });
  }
};

export var getUser = async (req, res) => {
  try {
    const getData = await UserModel.find();
    if (getData == "") {
      console.log("data not available");
      return res.status(200).json({ msg: "data not available" });
    } else {
      
      return res.status(200).json(getData);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return res
      .status(500)
      .json({ message: "Failed to retrieve data", error: error.message });
  }
};

export var singleUser = async (req, res) => {
  try {
    const username = req.body;

    const getData = await UserModel.findById(username._id);

    if (getData == "") {
      console.log("data not available");
      return res.status(200).json({ msg: "data not available" });
    } else {
      // console.log(getData);
      console.log("i am single useqerwiqerwiqerw");

      return res.status(200).json(getData);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return res
      .status(500)
      .json({ message: "Failed to retrieve data", error: error.message });
  }
};

export const uploadImage = async (req, res) => {
  try {
    console.log(req.body);
    return res.json({ message: req.body });
  } catch {
    console.error("Error fetching data:", error);
    return res
      .status(500)
      .json({ message: "Failed to retrieve data", error: error.message });
  }
};

// delete user

export const deleteUser = async (req, res) => {
  try {
    const userdata = req.params._id;
    console.log(userdata);

    const deleteuser = await UserModel.deleteOne({ _id: userdata });
    console.log(deleteuser);
    if (deleteuser.deletedCount == 1) {
      console.log("delete successfully.......");

      return res.status(200).json({ message: true });
    } else {
      return res.status(200).json({ message: "data not available" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to retrieve data", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const user = req.body;
  const { username, email, userId } = req.body;
  try {
    const getdata = await UserModel.find({ _id: userId });

    if (getdata && getdata.length > 0) {
      console.log(userId);
      const updateuser = await UserModel.updateOne(
        { _id: userId },
        { $set: { username: username, email: email } }
      );
      console.log("updateuser", updateuser);
      return res.json({ message: "user updated" });
    } else {
      console.log("user not available");
      return res.json({ message: "user not available" });
    }
  } catch (error) {}
  res.send("req.id");
};
