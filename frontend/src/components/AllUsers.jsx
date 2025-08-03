
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import { AppContext } from '../context/AppContext';

export default function AllUsers() {
    const { allUsers, setAllUsers, setGetuserId } = useContext(AppContext)
    const navigate = useNavigate();
    // const param = useParams()

    // const [username, setUsername] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState();
    // const [userId, setUserId] = useState();
    // // const [avatar, setAvatar] = useState([]);
    // const [allUsers, setAllUsers] = useState([]);
    // const [btnChange, setBtnChange] = useState(true);
    // const [errors, setErrors] = useState({});
    // const [nameErr, setnameErr] = useState();
    // const [passErr, setpassErr] = useState();
    // console.log(btnChange);

    // const validate = () => {
    //    let newErrors = {};

    //     if (!username.trim()) {
    //       newErrors.username = "Name is required";
    //     } else if (username.length < 2) {
    //       newErrors.username = "Name must be at least 2 characters long";
    //     }

    //     if (!password) {
    //       newErrors.password = "password is required";
    //     }

    //     if (!email) {
    //       newErrors.email = "Email is required";
    //     } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    //       newErrors.email = "Enter a valid email";
    //     }
    //     setErrors(newErrors);
    //     return Object.keys(newErrors).length === 0;
    // };


    // const handleSub = (e) => {
    //     e.preventDefault();
    //     setUsername(username);
    //     setEmail(email);
    //     setPassword(password);
    //     // console.log(btnChange);
    //     const user = { username: username, email: email, password: password };

    //     if (btnChange == true) {
    //         axios
    //             .post("/user/save", user)
    //             .then((res) => {
    //                 console.log("res", res.data);
    //                 // setUsername("");
    //                 // setEmail("");
    //                 // setPassword("");
    //                 // setBtnChange(true)
    //             })
    //             .catch(function (error) {
    //                 console.log(error);
    //             });
    //     } else {
    //         setUsername(username);
    //         setEmail(email);
    //         setPassword(password);
    //         setUserId(userId);
    //         // console.log(btnChange);

    //         const user = {
    //             username: username,
    //             email: email,
    //             password: password,
    //             _id: userId,
    //         };

    //         axios
    //             .post("/user/update", user)
    //             .then(() => {
    //                 console.log("update runnnn");
    //                 console.log("res", user);
    //                 setUsername("");
    //                 setEmail("");
    //                 setPassword("");
    //                 setBtnChange(true);
    //             })
    //             .catch(function (error) {
    //                 console.log(error);
    //             });
    //     }
    // };
    // const deleteUser = async (id) => {
    //     try {
    //         const res = await axios.delete(`/user/userdelete/${id}`);
    //         console.log(res);
    //         // Optionally update the user list after deletion
    //         setAllUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // const editUser = (id) => {
    //     //  setUsername(id);
    //     console.log(id);
    //     // axios
    //     //   .get(`/user/singleUser/${id}`)
    //     //   .then((res) => {
    //     //     console.log(id);
    //     //     // Optionally, set form fields with the fetched user data:

    //     setUsername(id.username);
    //     setEmail(id.email);
    //     setPassword(id.password);
    //     setUserId(id._id);
    //     setBtnChange(false);
    //     //     // setAvatar(res.data.avatar);
    //     //   })
    //     //   .catch((error) => {
    //     //     console.error(error);
    //     //   });
    // };

    // useEffect(() => {
    //     axios.get("/user/get").then((users) => {
    //         setAllUsers(users.data);
    //     });
    // }, []);
    // console.log(uid);

    function myprofile(id) {
        //   setGetuserId(id)
        navigate(`/profile/${id}`)

    }

    const editUser = (id) => {
        console.log(id);
        // navigate(`/login/${id}`)

    }
    return (
        <>

            <table className='m-auto w-[75%]  '>
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Action</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        allUsers && allUsers.map((users) => (
                            <tr key={users._id}>
                                <td>{users.username}</td>
                                <td>{users.email}</td>
                                <td>
                                    <button className='p-2 border-white rounded-sm  bg-blue-800 text-pink-900 mx-2' onClick={(e) => myprofile(users._id)} >Profile</button>
                                    <button className='p-2 border-white rounded-sm  bg-green-800 text-teal-700 mx-2' onClick={() => editUser(users._id)}>Edit</button>
                                    <button className='p-2 border-white rounded-sm  bg-red-800 text-teal-800 mx-2'>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </>
    );
}
