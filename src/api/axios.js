import axios from 'axios'


//https://serverdm.onrender.com
//'http://localhost:4000'
const BASE_URL = 'https://serverdm.onrender.com';

export default axios.create({
    baseURL:BASE_URL,
})

export const axiosPrivate = axios.create({
    baseURL:BASE_URL,
    headers:{'Content-Type':'application/json'},
    withCredentials:true,
})