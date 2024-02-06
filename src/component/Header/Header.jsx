import { Link} from "react-router-dom";
import logo from "../../img/logo.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn, faUser, faSignOut } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";


const Header = () => {
    const { username } = useAuth();
    const logout = useLogout();

    return (
        <section className="header">
            <div className="row justify-between align-center text-center">
            <div className="col logo">
                <Link to={"/"}>
                <img src={logo} alt="logo" style={{"width":"3em"}} />
                </Link>
            </div> 
            <div className="col">
                <ul className="row justify-between align-center no-wrap">
                    <li className="p-1"><Link to={"/services"}>Услуги</Link></li>
                    <li className="p-1"> <Link to={"/about"}>О нас</Link></li>
                    <li className="p-1"><Link to={"/contacts"}>Контакты</Link></li>
                </ul>      
            </div>
                {username ?
                <div className="col">
                        <div className="row justify-center align-center">
                        <div className="col login no-wrap" style={{color:"white"}}>
                            <FontAwesomeIcon icon={faUser}/> {username}
                        </div>
                        <div className="col login no-wrap" style={{color:"white"}} onClick={logout}>
                            Выйти &nbsp;
                            <FontAwesomeIcon icon={faSignOut}/>
                        </div>
                    </div>
                </div>   
                :
                <div className="col login">
                    <Link to={"/auth"}><FontAwesomeIcon icon={faSignIn}/> Вход/Регистрация</Link>
                </div>
                }
            </div>
        </section>
    );
};

export default Header;
