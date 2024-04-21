import React,{useEffect} from 'react';
import {useNavigate} from"react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {

  const navigate = useNavigate();
  useEffect(()=>{

    fetchData();
  // eslint-disable-next-line
  },[]);

  const fetchData = async()=>{
    const response = await fetch("/api/");
    const data = await response.json();
    console.log(data);
    if(data.msg ==="user not found" ){
      navigate('/login')
    }
    
  }



  return (
    <div>
      <Header/>
      hello
      <Footer/> 
   </div>
  )
}

export default Home