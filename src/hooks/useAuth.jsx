import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
    const { auth } = useContext(AuthContext)
    const token = auth;
    
    let isAdmin = false;
    let isPaid = false;
    let status = null;

    if(token){
        const decoded = jwtDecode(token);
        const {username, email, roles} = decoded.UserInfo;
        isAdmin = roles.includes("admin");
        isPaid = roles.includes("paidUser");
        status = isAdmin?"Admin":isPaid?"Premium user":"Free user";
        
        return {username, email, roles, isAdmin,isPaid,status}
    }

    return {username:null,email:null, roles:[], isAdmin, isPaid, status}
}

export default useAuth