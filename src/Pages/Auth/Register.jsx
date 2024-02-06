import {useRef,useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheck, faCircleInfo, faTimes} from '@fortawesome/free-solid-svg-icons'
import styles from './Login.module.css';
import axios from '../../api/axios';
import { Link } from 'react-router-dom'

const USER_REGEX=/^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;
const EMAIL_REGEX=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const REG_URL='/api/auth/signup';


const Register = () => {

    const userRef=useRef();
    const errRef=useRef();


    const [user,setUser]=useState('');
    const [validName, setValidName]= useState(false);
    const [userFocus, setUserFocus]=useState(false);

    const [password,setPassword]=useState('');
    const [validPassword, setValidPassword]= useState(false);
    const [passwordFocus, setPasswordFocus]=useState(false);

    const [email,setEmail]=useState('');
    const [validEmail, setValidEmail]= useState(false);
    const [emailFocus, setEmailFocus]=useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg]=useState('');
    const [success, setSuccess] = useState(false);

   useEffect(()=>{
        userRef.current.focus();
    },[]);

    useEffect(()=>{
        const result = USER_REGEX.test(user);
        setValidName(result);
    },[user])

    useEffect(()=>{
      const result = EMAIL_REGEX.test(email);
      setValidEmail(result);
    },[email])

    useEffect(()=>{
      const result = PWD_REGEX.test(password);
      setValidPassword(result);
      const match = password === matchPwd;
      setValidMatch(match);

    },[password,matchPwd])

    useEffect(() => {
      setErrMsg('');
    },[user,email,password,matchPwd])

    const handleSubmit = async (e)=>{
      e.preventDefault();
      const v1=USER_REGEX.test(user);
      const v2=EMAIL_REGEX.test(email);
      const v3=PWD_REGEX.test(password);

      if(!v1 || !v2 || !v3){
        setErrMsg("Invalid Entry");
        return;
      }
      try{
        const response = await axios.post(REG_URL, 
        JSON.stringify({username:user,email,password}),
          {
            headers:{'Content-Type':'application/json'},
            withCredentials:true
          }
        );
        console.log(response.accessToken);
        console.log(response.data);
        setSuccess(true);
      }catch(err){
        setErrMsg(err.response.data.error)
      }

    }

  return (
    <>
    {success? (
      <section className="row justify-center mt-2 text-center">
        <div className="col gray">
            <h1>
            {user} cпасибо за регистрацию.<br/>
            <Link to={"/auth"}>Авторизоваться</Link>  
          </h1>
        </div>
      </section>

    ):(
<section className={styles.main__auth}>
<p ref={errRef} className={errMsg? styles.errorMessage : "offscreen"} aria-live="assertive">{errMsg}</p>
    <h1 className={styles.sign} 
      align="center">Регистрация</h1>
    <form className={styles.auth} onSubmit={handleSubmit}>

      {/* Username input section */}

      <div className="row align-center justify-center mt-2">
        <div className="col self-center px-1">
          <input 
            ref={userRef}
            className={styles.un}
            type="text" align="center"
            id="username"
            autoComplete="off"
            required
            placeholder="Ваше имя"
            onChange={(e)=> setUser(e.target.value)}
            aria-invalid={validName? "false": "true"}
            aria-describedby="uidnote"
            onFocus={()=> setUserFocus(true)}
            onBlur={()=> setUserFocus(false)}
            />
        </div>

        {/*Username validation check marks */}

        <div>
          <span className={validName? styles.valid : "hide"} style={{marginLeft:'-2em'}} align="center">
          <FontAwesomeIcon icon={faCheck}/>
          </span>
          <span className={validName || !user ? "hide" : styles.invalid} style={{marginLeft:'-2.5em'}} align="center">
          <FontAwesomeIcon icon={faTimes}/>
          </span>
        </div>
      </div>
    {/* Username note section */}

    <div className="row justify-center">
      <div className="col-6">
        <p id="uidnote" className={userFocus && user && !validName? styles.instructions + " mt-half" : "hide"}>
          <FontAwesomeIcon icon={faCircleInfo} />
          &nbsp;от 4 до 24 знаков. <br />
          Должно начинаться с буквы, не с цифр или др. символов
        </p>
      </div>
    </div>
    {/* Email input section */}

    <div className="row justify-center align-center mt-2">
      <div className="col px-1">
        <input 
            className={styles.un} 
            type="email" 
            align="center" 
            id="email"
            autoComplete="off"
            required
            onChange={(e)=>setEmail(e.target.value)}
            aria-invalid={validEmail? "false": "true"}
            aria-describedby="emailnote"
            onFocus={()=> setEmailFocus(true)}
            onBlur={()=> setEmailFocus(false)}
            placeholder="Email"/>
      </div>
      {/*Email validation check marks */}
      <div>
        <span className={validEmail? styles.valid: "hide"} style={{marginLeft:'-2.5em'}}>
        <FontAwesomeIcon icon={faCheck}/>
        </span>
        <span className={validEmail || !email? "hide" : styles.invalid } style={{marginLeft:'-2.5em'}} >
        <FontAwesomeIcon icon={faTimes}/>
        </span>
      </div>
    </div>
    {/* Password input section */}
    <div className="row justify-center align-center mt-2">
      <div className="col px-1">
        <input 
          className={styles.pass} 
          type="password" 
          align="center" 
          onChange={(e)=>setPassword(e.target.value)}
          aria-invalid={validPassword? "false" : "true"}
          aria-describedby='pwdnote'
          onFocus={()=>setPasswordFocus(true)}
          onBlur={()=>setPasswordFocus(false)}
          placeholder="Пароль"/>
      </div>
      {/*Password validation check marks */}
      <div>
        <span className={validPassword? styles.valid:"hide"} style={{marginLeft:'-2.5em'}}>
          <FontAwesomeIcon icon={faCheck}/>
        </span>
        <span className={validPassword || !password? "hide": styles.invalid} style={{marginLeft:'-2.5em'}}>
          <FontAwesomeIcon icon={faTimes}/>
        </span>
      </div>
    </div>
    {/* Password note section */}
    <div className="row justify-center">
      <div className="col-6">
        <p id="pwdnote" className={passwordFocus && !validPassword? styles.instructions + " mt-half": "hide"} >
          <FontAwesomeIcon icon={faCircleInfo} />
          &nbsp;<u>Пароль должен состоять из 8 символов и содержать:</u><br />
          Большие и маленькие буквы с цифрами;<br/>
          Допускаються только латинские символы; <br/>
        </p>
      </div>
    </div>
    <div className="row justify-center align-center mt-2">
      <div className="col px-1">
        <input 
          className={styles.pass} 
          type="password" 
          align="center" 
          onChange={(e)=>setMatchPwd(e.target.value)}
          aria-invalid={!matchPwd? "true":"false"}
          aria-describedby="confirmnote"
          onFocus={()=>setMatchFocus(true)}
          onBlur={()=>setMatchFocus(false)}
          placeholder="Повторите пароль"/>
      </div>
      <div>
        <span className={validMatch && matchPwd? styles.valid :"hide"} style={{marginLeft:'-2.5em'}}>
            <FontAwesomeIcon icon={faCheck}/>
          </span>
        <span className={validMatch || !matchPwd? "hide": styles.invalid} style={{marginLeft:'-2.5em'}}>
          <FontAwesomeIcon icon={faTimes}/>
        </span>
      </div>
    </div>
    <div className="row justify-center">
      <div className="col-6">
        <p id="pwdnote" className={matchFocus && !validMatch? styles.instructions + " mt-half": "hide"} >
          <FontAwesomeIcon icon={faCircleInfo} />
          &nbsp;Повторите пароль
        </p>
      </div>
    </div>
    <div className="row justify-center mt-2 mb-1">
      <div className="col-2"></div>
      <div className="col-8">
        <button
          disabled={!validName || !validEmail || !validPassword || !validMatch ? true : false}
          className={!validName || !validEmail || !validPassword || !validMatch ? styles.disabled: styles.submit }
          align="center">Регистрация
        </button>
      </div>
      <div className="col-2"></div>
    </div>
    </form>     
                
  </section>)
    }
  </>
  )
}

export default Register

