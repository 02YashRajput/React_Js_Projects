import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import Header from '../components/Header';

const Dashboard = () => {
  const value = useContext(AppContext);
  if(!value){
    console.log("value is undefined")
  }
  const [waiting,setWaiting]= useState(true);
  useEffect(()=>{
    const fetch = async()=>{
      try{

      
      value?.setLoading(true);
      await value?.fetchData('/');
      
      }catch(err :any){
        console.log(err)
      }
     
    }
    fetch();
    // eslint-disable-next-line
  },[]);

  useEffect(()=>{

    if(value?.pageData?.userType){
      value?.setUserType(value?.pageData?.userType)
      setWaiting(false);
    }
    // eslint-disable-next-line
  },[value?.pageData])

  return (
    <>

      {waiting ? (
        <p>Loading...</p>
      ) : (
        
        <div>
          
          <Header/>
          
          
        </div>
      )}
    </>
  );
}

export default Dashboard