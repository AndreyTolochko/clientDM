import { useState } from 'react'
import {Link} from 'react-router-dom'
import {slide as Menu} from 'react-burger-menu'
import logo from '../../img/logo.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignIn, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons'
import useAuth from '../../hooks/useAuth'
import useLogout from '../../hooks/useLogout'

const HeaderMobile = () => {
    const { username } = useAuth();
    const [isOpen, setOpen] = useState(false);
    const logout = useLogout();
    const handleIsOpen = ()=>{
        setOpen(!isOpen);
    }
    const closeSide = ()=>{
        setOpen(false);
    }
  return (
        <Menu isOpen={isOpen} onOpen={handleIsOpen} onClose={handleIsOpen}>
            <Link to={"/"} onClick={closeSide}>
                <img src={logo} alt="logo" style={{"width":"3em", padding:0,}} />
            </Link>
            <Link className="menu-item" to={"/"} onClick={closeSide}>Главная</Link>
            <Link className="menu-item" to={"/services"} onClick={closeSide}>Услуги</Link>
            <Link className="menu-item" to={"/about"} onClick={closeSide}>О нас</Link>
            <Link className="menu-item" to={"/contacts"} onClick={closeSide}>Контакты</Link>
            {username ? <>
                <div className="menu-item" style={{color:'white'}}><FontAwesomeIcon icon={faUser}/>{username}</div>
                <div className="menu-item mt-1" style={{color:'white'}} onClick={logout}>Выйти&nbsp;<FontAwesomeIcon icon={faSignOut}/></div>
            </>
            :
                <Link className="menu-item" to={"/auth"} onClick={closeSide}><FontAwesomeIcon icon={faSignIn}/>&nbsp; Вход/Регистрация</Link>
            }
        </Menu>
  )
}

export default HeaderMobile