import React from "react";

import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
// import logo from "./assets/user.png";
import axios from "axios";
import ImageUp from "./ImageUp";

export default function Todo() {
  //   const [id, setId] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [allUsers, setAlltodos] = useState([]);
  const [btnChange, setBtnChange] = useState(true);
  // const [errors, setErrors] = useState({});

  useEffect(() => {
    getting();
  }, []);

  const handleSub = (e) => {
    e.preventDefault();
    // setId(id);
    setTitle(title);
    setDescription(description);
    const user = { title: title, description: description };
    console.log("run.............", user);

    if (btnChange == true) {
      axios
        .post("/todo/savetodo", user)
        .then(() => {
          // setAlltodos((prevUsers) => [...prevUsers, user]);
          setTitle("");
          setDescription("");
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      //   setId(id);
      setTitle(title);
      setDescription(description);
      // console.log(btnChange);

      const todo = {
        title: title,
        description: description,
      };

      axios
        .post("/todo/update", todo)
        .then(() => {
          console.log("update runnnn");

          // setAlltodos((prevUsers) => [...prevUsers, todo]);
          setTitle("");
          setDescription("");
          setBtnChange(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  // console.log(title);

 

  // const editTodo = (id) => {
  //   //  setTitle(id);
  //   console.log(id);
  //   // axios
  //   //   .get(`/todo/singleUser/${id}`)
  //   //   .then((res) => {
  //   //     console.log(id);
  //   //     // Optionally, set form fields with the fetched user data:

  //   setTitle(id.title);
  //   setDescription(id.description);
  //   setId(id.id);
  //   setBtnChange(false);
  //   //     // setAvatar(res.data.avatar);
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error(error);
  //   //   });
  // };

  const getting = async () => {
    await axios.get("/todo/get").then((todo) => {
      console.log(todo.data);
      setAlltodos(todo.data);
    });
  };

  return (
    <>
      <div className="bg-amber-600">
        <h1 className="text-center text-purple-950">todo list</h1>
        <br />
        <form className=" flex ">
          {/* <div className="mb-5">
            <label
              htmlFor="id"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Id
            </label>
            <input
              type="number"
              id="id"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="ram"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div> */}

          <div className="mb-5 w-[100rem]">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {/* {errors.title && <p className="text-red-500">{errors.title}</p>} */}
          </div>

          <div className="mb-5 w-[200rem]">
            <label
              htmlFor="desc"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <input
              type="text"
              id="desc"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Description .........."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="self-center h-12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={(e) => handleSub(e)}
          >
            {btnChange == true ? "submit" : "update"}
            {/* Submit */}
          </button>
        </form>
      </div>
      {console.log(allUsers.length)}
      <table className="border w-full text-start">
        <thead>
          <tr className="text-center">
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
       
      </table>
    </>
  );
}
