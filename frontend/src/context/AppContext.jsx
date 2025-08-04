import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { toast } from 'react-toastify'

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const backendUrl = "http://localhost:3000"
    // const backendUrl = import.meta.env.VITE_BACKEND_URL
    // console.log(import.meta.env.VITE_MYNAME);

    const [allUsers, setAllUsers] = useState([])
    const [getuserId, setGetuserId] = useState()
    const [logUser, setlogUser] = useState();
    const [getUid, setgetUid] = useState()


    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
    console.log(logUser);


    const getSingleUsers = async () => {
        await axios.post("/user/singleuser", {}, { headers: { token } }).then((res) => {
            setlogUser(res.data)
        }
        )
    }

    const getAllUsersdata = async () => {
        await axios.get("/user/get").then((res) => {
            setAllUsers(res.data)
        }
        )
    }

    useEffect(() => {
        getAllUsersdata()
        getSingleUsers()

    }, [])

    const value = { allUsers, setAllUsers, getuserId, setGetuserId, token, setToken, logUser, setlogUser, getAllUsersdata, setgetUid, getUid }

    return (
        <AppContext.Provider value={value}>
            {props.children}

        </AppContext.Provider>
    )
}
export default AppContextProvider

