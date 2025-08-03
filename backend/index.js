// Import necessary modules using ES6 syntax
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connection from "./db/connection.js";
connection()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize the Express application
const app = express();
const port = process.env.PORT || 3000; // Define the port for the server to listen on

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

import userRouter from "./routes/user.router.js";
import todoRouter from "./routes/todo.router.js";
import adminRouter from "./routes/admin.router.js";
import imageRouter from "./routes/image.router.js";

app.use("/admin", todoRouter);
app.use("/todo", todoRouter);
app.use("/user", userRouter);
app.use("/avatar", imageRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  
});
