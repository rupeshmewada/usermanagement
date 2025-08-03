
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function Login() {
  const { backendUrl, token, setToken, logUser, setlogUser } = useContext(AppContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [login, setLogin] = useState(true);
  const [image, setImage] = useState(false)


  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (login) {

      var user = { email, password }
      // console.log(user);
      await axios.post("/user/login", user).then((res) => {
        // console.log(res.data);
        // console.log(res.data.token);
        // console.log(res.data.Content_Type);
        setlogUser(res.data.user)
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        navigate('/')
      })

    }
    else {

      const formData = new FormData()
      formData.append('username', username)
      formData.append('email', email)
      formData.append('password', password)
      image && formData.append('image', image)

      console.log(formData);

      // user = { username: username, email: email, password: password }
      await axios.post("/user/register", formData).then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        setlogUser(res.data.user)
        setToken(res.data.token);
        setLogin(false)
        navigate('/')

      })
    }
  }

  return (
    <>
      <div className="bg-gray-400 w-3/4 m-auto py-20 text-black">
        {
          login ? (
            <h1 className='text-center text-2xl font-bold'>Login</h1>
          ) : (
            <h1 className='text-center text-2xl font-bold'>Sign Up</h1>

          )
        }
        <form className="max-w-sm mx-auto ">
          {
            login == false ?
              (<div className="mb-5">
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
                  placeholder="ram"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>) :
              ("")
          }

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
              placeholder="name@flowbite.com"
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
          { login == false ?

           ( <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' />)
            :("")
          }
       
          <div className='m-auto text-center'>

            <button
              type="Submit"
              className="my-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              onClick={(e) => handleSubmit(e)}
            >submit</button>
          </div>

          {/* Submit */}
        </form >
        {
          login ?
            <h2 className='text-center'> To sign up using this  button < button className=' text-red-800 cursor-pointer underline ' onClick={() => setLogin(pre => !pre)
            } > Signup</button ></h2 >
            :
            <h2 className='text-center'> To login using this  button  <button className=' text-red-800  cursor-pointer underline ' onClick={() => setLogin(pre => !pre)}> Login</button></h2>
        }
      </div >

    </>
  )

}
