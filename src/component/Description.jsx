import React from 'react';
import { useEffect, useState } from 'react';
import axios from '../api/axios';

const Description = () => {

const [data, setData] = useState(null);

  useEffect(() => {
    let ignore=false;
    const fetchContent = async () =>{
      try{
        const response = await axios.post("/content")
        setData(response.data)
      }catch(error){
        console.log(error.message);
      }

    }
    try{
      if(!ignore){
        fetchContent();
      }
    }catch(error){
      console.log(error.response?.message)
    }
    return ()=>{
      ignore=true;
    }
}, []);



  return (
    <section className='row-column'>
        <h3 className='col text-center p-1'>{data && data.title}</h3>
        <div className='col text-justify px-2' dangerouslySetInnerHTML={data && {__html:data.text}}/>
    </section>
  )
}

export default Description