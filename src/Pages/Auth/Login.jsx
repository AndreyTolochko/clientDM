import AuthContext from '../../context/AuthProvider';
import {useRef, useState,useEffect, useContext} from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { axiosPrivate } from '../../api/axios';
import styles from './Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';

const LOGIN_URL='/api/auth'


const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const errRef=useRef();
  const emailRef=useRef();
  const navigate = useNavigate();
  const location=useLocation();
  const[email, setEmail]=useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg]=useState('');
  
  useEffect(()=>{
    emailRef.current.focus();
  },[]);

  useEffect(()=>{
    setErrMsg('');
  },[email,pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response=await axiosPrivate.post(LOGIN_URL,
        JSON.stringify({email,password:pwd})
        );
      const accessToken= response?.data?.accessToken;
      setAuth(accessToken);
      setEmail('');
      setPwd('');
      navigate('/', {from:location});   
      
    }catch(err){
      if(!err?.response){
        setErrMsg('Сервер не отвечает');
      }else if (err.response?.status ===400){
        setErrMsg('Почта или пароль не введены');
      }else if (err.response?.status ===401){
        setErrMsg('Почта либо пароль введены не правильно попробуйте ещё');
      }else if(err.response?.status===429){
        setErrMsg('Слишком много неправильных попыток входа. Попробуйте войти позже.')
      }else{
        setErrMsg('Попытка войти не удалась')
      }
      errRef.current.focus()
    }

  }

  
  return (
    <>
    <section className={styles.main__auth}>
      <p ref={errRef} className={errMsg? styles.errMsg : "offscreen"} aria-live="assertive">{errMsg}</p>
      <h1 className={styles.sign} align="center">Войти</h1>
      <form className={styles.auth} onSubmit={handleSubmit}>
        <div className="row justify-center align-center mt-1">
          <div className="col-8">
            <input 
              className={styles.un}
              type="text"
              id="email"
              ref={emailRef}
              autoComplete="off"
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
              required
              placeholder='email'
              />
          </div>

        </div>
      <div className="row justify-center align-center mt-1">
        <div className="col-8">
          <input 
            className={styles.pass}
            type="password"
            id="password"
            autoComplete="off"
            onChange={(e)=>setPwd(e.target.value)}
            value={pwd}
            required
            placeholder='password'
            />
        </div>
      </div>

      <div className="row justify-center align-center mt-1">
        <div className="col-8">
        <button className={styles.submit} align="center">Войти</button>
        </div>
      </div>
      </form>
      <p className={styles.forgot} align="center">Хотите зарегистрироваться?<br/>
        <span className="line">
          <u><Link className={styles.line__link} to={"signup"}><FontAwesomeIcon icon={faSignIn}/> Регистрация</Link></u>
        </span>
      </p>
    </section>
    </>
    
  )
}

export default Login