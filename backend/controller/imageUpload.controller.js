import UserModel from "../models/todos/user.model.js";
import ImageUpload from "../models/todos/image.model.js";
import path from "path";
import fs from "fs";

// app.get("/image/:id", async (req, res) => {
//   const image = await ImageUpload.findById(req.params.id);
//   res.set("Content-Type", image.image.contentType);
//   res.send(image.image.data);
// });

var saveImage = async (req, res) => {
  try {
    console.log(req.body);

    const imageFile = req.file;
    console.log(imageFile);

    const imageData = fs.readFileSync(req.file.path);

    const imageup = await ImageUpload.insertOne({
      name: req.file.originalname,
      image: {
        data: imageData,
        contentType: req.file.mimetype,
      },
    });
    console.log(imageup);

    // Optional: delete temp file from local storage
    fs.unlinkSync(req.file.path);

    // res.set("Content-Type", image.image.contentType);
    // res.send(image.image.data);

    res.status(200).json({ message: imageup });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Failed to upload image" });
  }
};

// if (imageFile) {
//       // upload image to cloudinary
//       const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
//         resource_type: "image",
//       });
//       const imageURL = imageUpload.secure_url;

//       await ImageUpload.insertOne(userId, { image: imageURL });
//     }

export default saveImage;
