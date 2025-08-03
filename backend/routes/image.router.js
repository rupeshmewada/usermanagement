import express from "express";
import multer from "multer";
import upload from "../middleware/multer.middleware.js";
import saveImage from "../controller/imageUpload.controller.js"

const router = express.Router();

router.post("/profile", upload.single("image"), saveImage);

export default router;

