import express from 'express'
const router = express.Router()

import  * as todoController  from '../controller/todo.controller.js';

router.post("/savetodo",todoController.saveTodo);
router.get("/get", todoController.getTodo);
router.delete("/tododelete/:id", todoController.deleteTodo);
// router.get("/singleTodo/:_id", todoController.singleTodo);
// router.post("/update", todoController.updateTodo);


export default router;