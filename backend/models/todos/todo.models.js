import mongoose from "mongoose";

const todoSchema=mongoose.Schema({
title:{
  type:String,
  required: true,
},
description:{
  type:String,
  required: true,
},
id:{
  type:Number,
  required: true,
  unique:true
},
createdBy:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User"
},
// status:{
//   type:String,
//   enum:['done','not done'],
//   default:"not done"
// }
},
{timestamps:true}
)

 const Todo = mongoose.model("Todo",todoSchema)  
 export default Todo
 