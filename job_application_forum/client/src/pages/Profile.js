import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Loading from '../components/Loading';
import { IoPerson } from "react-icons/io5"
import Footer from '../components/Footer';
import JobSeekerProfile from '../components/JobSeekerProfile';
import EmployerProfile from '../components/EmployerProfile';

const Profile = () => {
  const [userData,setUserData] = useState({}); 
const [loading,setLoading] = useState(true);
  useEffect(()=>{
    fetchData();
    setLoading(false);
  },[])
  const fetchData = async() =>{
    const response = await fetch("/api/profile");
    const data = await response.json();
    console.log(data);
    setUserData(data);
  }
  return (
    <div className='flex flex-col items-center justify-center relative pt-36  min-h-screen min-w-screen text-slate-800 dark:bg-slate-800 dark:text-slate-200'> 
      <Header className="z-50" />
      {
        loading ? (<Loading/>):
        userData.user ? 

        userData.user.userType === "job_seeker" ? (<JobSeekerProfile userData={userData}/>):(<EmployerProfile userData={userData}/>) 
        :(<div> NO user Found </div>)
      }
      <Footer/>
    </div>
  )
}

export default Profile