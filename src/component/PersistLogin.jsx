import { Outlet } from 'react-router-dom'
import {useState, useEffect, useContext} from 'react'
import useRefreshToken from '../hooks/useRefreshToken'
import AuthContext from '../context/AuthProvider'
import Loading from '../component/Loading'

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
                <Loading/>
              )
            :<Outlet />
            }
        </>
    )

}

export default PersistLogin