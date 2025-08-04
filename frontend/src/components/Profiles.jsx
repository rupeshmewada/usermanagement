import React, { useContext } from 'react'
import photo from '../assets/user.png'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Profiles() {
    let navigate = useNavigate();

    const { allUsers, setAllUsers, getuserId, logUser, getAllUsersdata, getUid } = useContext(AppContext)

    // const param = useParams()
    // const user = allUsers.filter((item) => item._id == param.id)

    const [username, setUsername] = useState("");
    const [userId, setuserId] = useState();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState();
    const [image, setImage] = useState(false)
    const [message, setMessage] = useState()
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (getUid) {
            setUsername(getUid.username)
            setuserId(getUid._id)
            setEmail(getUid.email)
            setPassword(getUid.password)
        }

    }, [getUid])

    const userUpdate = async (e) => {
        e.preventDefault();
        let formupdate = {
            userId,
            username,
            email
        }

        try {
            const res = await axios.put(`/user/update`, formupdate);
            if (res.status === 200) {
                setMessage(res.data.message);
                getAllUsersdata()
                navigate('/allusers')
            }
        } catch (err) {
            setMessage('Error updating user');
        }
    };

    return (
        <>
            <div className="max-w-md mx-auto mt-10 p-6  rounded-2xl shadow-lg">
                {/* <h1 className="text-2xl font-bold mb-4 text-center">Profile Page</h1>
                    {
                        logUser ?
                            <img src={logUser.imageSrc} alt="image not available" className='rounded-full mx-auto w-2/3' />
                            :
                            <img src={photo} alt=" not available" className='rounded-full mx-auto w-2/3' />

                    } */}

                {editing ? (
                    <form className="max-w-sm mx-auto ">
                        <div className="mb-5">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                                Your name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        < div className="mb-5">
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                                Your email
                            </label>
                            <input
                                type="text"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {/* <p className="text-red-500">{errors.email}</p> */}
                        <div className="mb-5">
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                                Your password
                            </label>

                            <input
                                type="password"
                                id="password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' />

                        <div className='m-auto text-center'>

                            <button
                                type="Submit"
                                className="my-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                                onClick={(e) => userUpdate(e)}
                            >Update</button>

                        </div>

                    </form >
                ) : (
                    <div className="space-y-2">
                        <p><strong>Name:</strong> {username}</p>
                        <p><strong>Email:</strong> {email}</p>
                        <button
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={() => {
                                setEditing(true);
                            }}
                        >
                            Edit Profile
                        </button>
                    </div>
                )}
            </div>


        </>
    )
}
