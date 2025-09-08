import express from "express";
import multer from "multer";
import userAuth from "../middleware/userAuth.js";
import upload from "../middleware/multer.middleware.js";

import * as userController from "../controller/user.controller.js";

const router = express.Router();

router.post("/save", userController.saveUser);

router.get("/get", userController.getUser);
router.post("/singleuser", userAuth, userController.singleUser);
router.delete("/userdelete/:_id", userController.deleteUser);
router.put("/update", userController.updateUser);

router.post("/register",upload.single("image"), userController.registerUser);
router.post("/login", userController.loginUser);

// router.post("/profile", upload.single("image"), saveImage);

export default router;
