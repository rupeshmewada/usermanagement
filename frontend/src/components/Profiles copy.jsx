import React, { useContext } from 'react'
import photo from '../assets/user.png'
import { AppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom';

export default function Profiles() {
    const { allUsers, setAllUsers, getuserId, logUser } = useContext(AppContext)
    // const [logUser, setlogUser] = useState();

    const param = useParams()
    const user = allUsers.filter((item) => item._id == param.id)
    // console.log(user[0]);
    console.log(logUser);
    // console.log(param);

    return (
        <>
            <div className='flex gap-4 border-none bg-blue-300 text-black w-full'>
                <div className='bg-red-400 w-[30%] text-white p-3'>
                    {
                        logUser ?
                            <img src={logUser.imageSrc} alt="image not available" className='rounded-full mx-auto w-2/3' />
                            :
                            <img src={photo} alt=" not available" className='rounded-full mx-auto w-2/3' />
                           
                    }
                    {/* <h1 className='text-center text-3xl '>Name:{user[0] == undefined ? "": user[0].username}</h1> */}
                    <h1 className='text-center text-3xl capitalize '>Name:{user[0] && user[0].username}</h1>
                    <h1 className='text-center text-3xl '>Designation</h1>
                </div>

                <div style={{}} className='text-2xl font-medium text-gray-600 p-4 w-[70%]'>
                    <div>
                        Information
                        <hr className='' />
                        <div className='flex justify-around '>
                            <h2 className=''>
                                Email
                                <br />
                                <span className='text-gray-800'>

                                    {user[0] && user[0].email}
                                </span>
                            </h2>
                            <h2 className=''>
                                Phone
                                <br />

                            </h2>
                        </div>
                    </div>
                    <div>
                        Information
                        <hr className='' />
                        <div className='flex justify-around '>
                            <h2 className=''>
                                Email
                                <br />
                            </h2>
                            <h2 className=''>
                                Phone
                                <br />

                            </h2>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}
