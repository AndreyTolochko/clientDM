import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faCheck,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Contacts.module.css";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{2,20}$/;
const PHONE_REGEX = /^(\d{2,3})\s?(\d{3})\s?(\d{2,3})$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const countries = {
  380: "🇺🇦 +380",
  7: "🇷🇺 +7",
  375: "🇧🇾 +375",
  995: "🇬🇪 +995",
  77: "🇰🇿 +77", // Note: Kazakhstan's code can overlap with Russia's. Adjust as needed.
};

const ContactForm = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [selectedCountry, setSelectedCountry] = useState("380");

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [text, setText] = useState("");
  const [textFocus, setTextFocus] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setError("");
  }, [user, phone, email]);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PHONE_REGEX.test(phone);
    setValidPhone(result);
  }, [phone]);

  const handleCountryCodeChange = (e) => {
    setSelectedCountry(e.target.value);
    setPhone("");
  };
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const MAX_LENGTH = 10;
    if (value === "" || /^\d*$/.test(value) & (value.length <= MAX_LENGTH)) {
      setPhone(value);
    } else {
      if (value.length > 1) {
        e.target.value = phone;
      } else {
        e.target.value = "";
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PHONE_REGEX.test(phone);
    const v3 = EMAIL_REGEX.test(email);

    if (!v1) {
      setError("Не правильный ввод в имени пользователя");
      return;
    } else if (!v2) {
      setError("Не правильно введен телефон");
      return;
    } else if (!v3) {
      setError("Почта введена не правильно");
      return;
    }
    

  };

  return (
    <section className="contacts container">
      {/*<div className="row text-center px-2">
        <div className="col">Наш Адрес:</div>
        <div className="col">Селима Химшиашвили, 20, Батуми, Грузия</div>
      </div>
      <div className="row text-center mt-1">
        <div className="col">Почта:</div>
        <div className="col">kravecjulia@icloud.com</div>
      </div>*/}
      <div className="row justify-center align-center mt-1">
        <div className="col text-center">
          <h1 className="mb-1">Напишите нам и мы свяжемся с вами</h1>
          <p
            ref={errRef}
            className={error ? styles.errMsg : "offscreen"}
            aria-live="assertive"
          >
            {error}
          </p>
          {/*FORM STARTS*/}
          <form onSubmit={handleSubmit} className={styles.contactForm}>
            {/*USERNAME INPUT STARTS*/}
            <div className="row justify-center text-center pt-1 px-2">
              <div className="col">
                <input
                  ref={userRef}
                  className={styles.un}
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={(e) => setUser(e.target.value)}
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
                <p
                  id="uidnote"
                  className={
                    userFocus && user && !validName
                      ? styles.instructions + " mt-half"
                      : "hide"
                  }
                >
                  <FontAwesomeIcon icon={faCircleInfo} />
                  &nbsp;Имя пользователя должно состоять от 3 до 20 латинских символов<br />
                </p>
              </div>
            </div>
            {/*USERNAME INPUT ENDS*/}

            {/*PHONE INPUT STARTS*/}
            <div className="row justify-center text-center pt-1 px-2">
              <div className="col-4" style={{ paddingRight: "1em" }}>
                <select
                  className={styles.un}
                  value={selectedCountry}
                  onChange={handleCountryCodeChange}
                >
                  {Object.entries(countries).map(([code, name]) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-8">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone (Optional)"
                  onChange={handlePhoneChange}
                  aria-invalid={validPhone ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setPhoneFocus(true)}
                  onBlur={() => setPhoneFocus(false)}
                />
              </div>
            </div>
            {/*PHONE INPUT ENDS*/}

            {/*EMAIL SECTION*/}
            <div className="row text-center justify-center align-center px-2 pt-1">
              <div className="col">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
              </div>
              {
                emailFocus?
                  validEmail?
                <div >
                <span style={{color:'green', marginLeft:'-2em'}}>
                <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                </span> 
                </div>
                :                
                <div>
                <span style={{color:'red', marginLeft:'-2em'}}>
                <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                </span> 
                </div>
                :
                <span></span>
              }
 
            </div>
            {/*EMAIL INPUT ENDS*/}

            {/*TEXTAREA INPUT STARTS*/}
            <div className="row justify-center align-center px-2 pt-1">
              <div className="col">
                <textarea
                  name="message"
                  placeholder="Your message"
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
            </div>
            {/*TEXTAREA INPUT STARTS*/}

            {/*BUTTON STARTS*/}
            <div className="row justify-center align-center p-1">
              <div className="col">
                <button className={styles.submit} align="center">
                  Отправить
                </button>
              </div>
            </div>
            {/*BUTTON ENDS*/}
          </form>
          {/*FORM ENDS STARTS*/}
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
