import { useContext } from "react"
import AuthContext from "../context/AuthProvider"
import { axiosPrivate } from "../api/axios";

const LOGOUT_URL = "/api/auth/logout";

const useLogout = () => {
    const {setAuth} = useContext(AuthContext)
    const logout = async() => {
        setAuth(null)
        try{
            const response = await axiosPrivate.post(LOGOUT_URL)

            if(response.status === 204){
                return console.log('There is no cookies stored')
            }
            return console.log(response.data);
        }catch(err){
            return console.log(err.response)
        }
    }
  return logout;
}

export default useLogout