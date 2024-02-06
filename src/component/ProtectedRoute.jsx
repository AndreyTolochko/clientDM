import useAuth from '../hooks/useAuth'
import {Outlet, Navigate, location} from 'react-router-dom'

const ProtectedRoute = () => {
    const {auth} = useAuth();
  return (
    auth?.user
    ?<Outlet/>
    : <Navigate to='/auth' state={{from:location}} replace />

  )
}

export default ProtectedRoute