import express from 'express'
import multer from "multer";
import adminAuth from '../middleware/adminAuth.js'

import  * as userController  from '../controller/user.controller.js';
import {loginAdmin} from '../controller/admin.controller.js'
const adminRouter = express.Router()

adminRouter.post('/login', loginAdmin)
// adminRouter.post('/all-Users', adminAuth, allUsers)

// router.post("/save", userController.saveUser);

// router.get("/get", userController.getUser);
// router.post("/singleuser", adminAuth, userController.singleUser);
// router.delete("/userdelete/:_id", userController.deleteUser);
// router.put("/update", userController.updateUser);


export default adminRouter;