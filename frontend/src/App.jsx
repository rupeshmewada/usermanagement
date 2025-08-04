import { useContext, useEffect, useState } from "react";
import "./App.css";
// import ImageUp from "./ImageUp";
// import Todo from "./Todo";
// import UserProfileUpdater from "./UserProfileUpdater";
// import User from './User'
import Navbar from './components/Navbar'
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AllUsers from "./components/AllUsers";
import { AppContext } from "./context/AppContext";
import Profiles from "./components/Profiles";
import UserProfileUpdater from "./UserProfileUpdater";
import UpdateUser from "./components/UpdateUser";


export default function App() {
  return (
    <>

      <Navbar />

      <Routes>
        <Route path="/" element={< Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/allusers" element={<AllUsers />} />
        <Route path="/profile/:id" element={<Profiles />} />
        <Route path="/update" element={<UpdateUser />} />

      </Routes>

    </>
  )
}
