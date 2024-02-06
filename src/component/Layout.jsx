import Footer from './Footer'
import Header from './Header/Header'
import HeaderMobile from './Header/HeaderMobile'
import { Outlet} from 'react-router-dom'

const Layout = ()=>{
    return(
        <div className='App'>
            <HeaderMobile />
            <Header />
            <Outlet />
            <Footer/>
        </div>
        )
    }

export default Layout