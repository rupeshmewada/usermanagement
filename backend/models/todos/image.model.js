import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
    name: {
        type: String
    },
    image: {
    data: Buffer,
    contentType: String,
  },
});

const ImageUpload = mongoose.model("ImageUpload", imageSchema);

export default ImageUpload;
