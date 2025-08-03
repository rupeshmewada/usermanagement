import { log } from "console";
import TodoModel from "../models/todos/todo.models.js";

export var saveTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const alluser = await TodoModel.find();
   
    let todo;
    if (alluser.length == 0) {
      todo = { id: 1, title: title, description: description };
      var newtodo = await TodoModel.create(todo);
    } else {
      let id = alluser[alluser.length - 1].id + 1;
      console.log(id);

      todo = { id: id, title: title, description: description };
      var newtodo = await TodoModel.create(todo);
    }
    console.log(newtodo);

    return res.status(200).json({ msg: "get data ....." });
  } catch (error) {
    console.error("Error saving data:", error);
    return res
      .status(500)
      .json({ message: "Failed to retrieve data", error: error.message });
  }
};

export var getTodo = async (req, res) => {
  try {
    const getData = await TodoModel.find();
    if (getData == "") {
      console.log("data not available");
      return res.status(200).json({ msg: "data not" });
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

// export var singletodo = async (req, res) => {
//   try {
//     const todo = req.params;
//     const getData = await TodoModel.find({ _id: todo });
//     if (getData == "") {
//       console.log("data not available");
//       return res.status(200).json({ msg: "data not available" });
//     } else {
//       console.log(getData);

//       return res.status(200).json(getData);
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return res
//       .status(500)
//       .json({ message: "Failed to retrieve data", error: error.message });
//   }
// };

// // delete todo

export const deleteTodo = async (req, res) => {
  try {
    const tododata = req.params.id;
    console.log(tododata);

    const deletetodo = await TodoModel.deleteMany({ id: tododata });
    console.log(deletetodo);
    if (deletetodo.deletedCount == 1) {
      console.log("delete successfully.......");

      return res.status(200).json({ message: "data delete" });
    } else {
      return res.status(200).json({});
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to retrieve data", error: error.message });
  }
};

// export const updatetodo = async (req, res) => {
//   // console.log(req.body);
//   const todo = req.body;
//   try {
//     const getdata = await TodoModel.find({ _id: todo._id });
//     console.log(getdata);
//     if (getdata) {

//       const updatetodo = await TodoModel.updateOne({_id:todo._id},{ $set: todo });
//       console.log("get data ",updatetodo);
//       return res.json({ message: "usser update " });
//     } else {
//       return res.json({ message: "todo not available" });
//     }
//   } catch (error) {}
//   res.send("req.id");
// };
