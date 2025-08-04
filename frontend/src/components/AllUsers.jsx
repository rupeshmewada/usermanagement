
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import { AppContext } from '../context/AppContext';

export default function AllUsers() {
    const { allUsers, setAllUsers, getAllUsersdata, setgetUid } = useContext(AppContext)
    const navigate = useNavigate();


    function myprofile(users) {
        setgetUid(users)
        navigate(`/profile/${users._id}`)

    }

    const editUser = (users) => {
        console.log(users);
        setgetUid(users)
        navigate(`/update`)

    }

    const deleteUser = async (id) => {
        try {
            const res = await axios.delete(`/user/userdelete/${id}`);
            if (res.status === 200) {
                console.log(`User deleted successfully: ${id}`);
                getAllUsersdata();
            } else {
                console.error(`Error deleting user: ${res.status} ${res.statusText}`);
            }
        } catch (error) {
            console.error(`Error deleting user: ${error.message}`);
        }
    };

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
                                    <button className='p-2 border-white rounded-sm  bg-blue-800 text-pink-900 mx-2 cursor-pointer' onClick={(e) => myprofile(users)} >Profile</button>
                                    <button className='p-2 border-white rounded-sm  bg-green-800 text-teal-700 mx-2 cursor-pointer' onClick={() => editUser(users)}>Edit</button>
                                    <button className='p-2 border-white rounded-sm  bg-red-800 text-teal-800 mx-2 cursor-pointer' onClick={() => deleteUser(users._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </>
    );
}
