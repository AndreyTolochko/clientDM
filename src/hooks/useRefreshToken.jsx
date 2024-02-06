import axios from "../api/axios"
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const RFR_URL = "/api/auth/refresh";


function useRefreshToken(){
    const {setAuth} = useContext(AuthContext)
    const refresh = async () =>{
        try{
            const response = await axios.get(RFR_URL, {
                withCredentials: true,
            });
            setAuth(response.data.accessToken);
            return response.data.accessToken;
        }catch(error){
            console.log(error.message);
            if(error.response){
                console.log(error.response.data?.message);
            }
        }
    }
  return refresh;
}

export default useRefreshToken