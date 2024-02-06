import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const Dropdown = (props) =>{
    const [isOpen, setIsOpen] = useState(false);
    const { isPaid,status} = useAuth();

    const toggleDropdown = () => {
          setIsOpen(!isOpen);
    };
    //Content for full access users and admins
    let content = (<>
            <div className="dropdown-content" dangerouslySetInnerHTML={{__html:props.initial}}/>
            {props.initial?<div className="dropdown-divider mb-1" />: null}
            <div className="dropdown-content" dangerouslySetInnerHTML={{__html:props.description}} />
          </>)
    //If user is free paid content hidden
    if(!props.isFree & !status){
      content = (
          <div className="dropdown-content">
             <Link to={"/auth"}><u>Войдите или зарегестрируйтесь</u></Link>
          </div>
      )
    }else if(!props.isFree & !isPaid){
      content = (
        <div className="dropdown-content justify-center">
           <Link to={"/auth"}><u>Это платный контент. 
           Всего лишь за одну чашку кофе вы можете узнаеть многое о своей судьбе</u></Link>
        </div>
    )
    }
    return (<>
              <div className="dropdown p-1 px-1">
              <h3 onClick={toggleDropdown}>{props.label}</h3>
              </div>
              <div className="pt-1 px-1">
                {isOpen && content}
              </div>
        </>
      );
}

export default Dropdown;