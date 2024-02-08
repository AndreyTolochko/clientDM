import axios from 'axios'


const BASE_URL = () =>{
    if(process.env.NODE_ENV === 'production'){
        return 'https://serverdm.onrender.com'
    }
    return 'http://localhost:4000'
}

export default axios.create({
    baseURL:BASE_URL(),
})

export const axiosPrivate = axios.create({
    baseURL:BASE_URL(),
    headers:{'Content-Type':'application/json'},
    withCredentials:true,
})