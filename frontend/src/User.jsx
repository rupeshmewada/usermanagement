import React, {useState,useEffect} from 'react'
import logo from "./assets/user.png";
import axios from 'axios';
import ImageUp from "./ImageUp";
import Todo from "./Todo";
import FileUpload from "./FileUpload";

export default function User() {

     const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [userId, setUserId] = useState();
  // const [avatar, setAvatar] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [btnChange, setBtnChange] = useState(true);
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

  const handleSub = (e) => {
    e.preventDefault();
    setUsername(username);
    setEmail(email);
    setPassword(password);
    // console.log(btnChange);
    const user = { username: username, email: email, password: password };

    if (btnChange == true) {
      axios
        .post("/user/save", user)
        .then((res) => {
          console.log("res", res.data);
          // setUsername("");
          // setEmail("");
          // setPassword("");
          // setBtnChange(true)
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setUsername(username);
      setEmail(email);
      setPassword(password);
      setUserId(userId);
      // console.log(btnChange);

      const user = {
        username: username,
        email: email,
        password: password,
        _id: userId,
      };

      axios
        .post("/user/update", user)
        .then(() => {
          console.log("update runnnn");
          console.log("res", user);
          setUsername("");
          setEmail("");
          setPassword("");
          setBtnChange(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(`/user/userdelete/${id}`);
      console.log(res);
      // Optionally update the user list after deletion
      setAllUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const editUser = (id) => {
    //  setUsername(id);
    console.log(id);
    // axios
    //   .get(`/user/singleUser/${id}`)
    //   .then((res) => {
    //     console.log(id);
    //     // Optionally, set form fields with the fetched user data:

    setUsername(id.username);
    setEmail(id.email);
    setPassword(id.password);
    setUserId(id._id);
    setBtnChange(false);
    //     // setAvatar(res.data.avatar);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  useEffect(() => {
    axios.get("/user/get").then((users) => {
      setAllUsers(users.data);
    });
  }, []);
  // console.log(uid);
   return (
     <>
       {/* <h2>front end </h2> */}
       {/* <Todo/> */}
     
       {/* <ImageUp /> */}
       {/* <FileUpload /> */}
 
       <div className="">
         <br />
         <form className="max-w-sm mx-auto ">
           <div className="mb-5">
             <label
               htmlFor="name"
               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
             {/* {errors.username && <p className="text-red-500">{errors.username}</p>} */}
           </div>
 
           <div className="mb-5">
             <label
               htmlFor="email"
               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
           {/* <p className="text-red-500">{passErr}</p> */}
           {/* <div className="mb-5">
             <label
               htmlFor="avatar"
               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
             >
               upload your avatar
             </label>
             <input
               type="file"
               id="avatar"
               className="bg-gray-50 border border-gray-300 text-red-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 m-auto p-6  dark:bg-red-300 dark:border-black dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
               value={avatar}
               onChange={(e) => setAvatar(e.target.value)}
               // onChange={(e)=>formdataupload(e)}
             />
           </div> */}
 
           <button
             type="submit"
             className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
             onClick={(e) => handleSub(e)}
           >
             {btnChange == true ? "submit" : "update"}
             {/* Submit */}
           </button>
         </form>
       </div>
       {/* <p>{count.jokes.type}</p> */}
       <table className="border w-full text-start">
         <thead>
           <tr className="text-center">
             {/* <th >id</ th> */}
             <th>name</th>
             <th>email</th>
             <th>password</th>
             <th className="w-18 ">Avatar</th>
             <th>Action</th>
           </tr>
         </thead>
         <tbody>
           {allUsers.map((item, index) => (
             <tr key={index} className="">
               <td>{item.username}</td>
               <td>{item.email}</td>
               <td>{item.password}</td>
               {/* <p>jsdf oijd</p> */}
               <td className="">
                 {item.avatar == null ? (
                   <img src={logo} alt="" />
                 ) : (
                   `${item.avatar}`
                 )}{" "}
               </td>
               <td>
                 <button
                   className="bg-blue-500 m-2 p-2 rounded-sm border-blue "
                   onClick={() => {
                     editUser(item);
                   }}
                 >
                   Edit
                 </button>
 
                 <button
                   className="bg-red-500 m-2 p-2 rounded-sm border-blue "
                   onClick={() => {
                     deleteUser(item._id);
                   }}
                 >
                   Delete
                 </button>
               </td>
             </tr>
           ))}
         </tbody>
       </table>
     </>
   );
}
