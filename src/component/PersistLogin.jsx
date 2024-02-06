import { Outlet } from 'react-router-dom'
import {useState, useEffect, useContext} from 'react'
import useRefreshToken from '../hooks/useRefreshToken'
import AuthContext from '../context/AuthProvider'

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken()
    const {auth, setAuth} = useContext(AuthContext)

    useEffect(() =>{
        async function verifyRefreshToken(){
            try {
                const token=await refresh()
                setAuth(token)
            } catch (err){
                console.log(err)
                setAuth(null)
            } finally{
                setIsLoading(false)
            }
        }

        !auth? verifyRefreshToken():setIsLoading(false)
    },[]);
    
    useEffect(() =>{
        let ignore = false;
        !ignore && console.log(`isLoading: ${isLoading}`)
        return ()=>ignore=true;
        },[isLoading])

    return (
        <>
            {isLoading?
            (
                <div className="spinner-container">
                  <div className="spinner"></div>
                </div>
              )
            :<Outlet />
            }
        </>
    )

}

export default PersistLogin