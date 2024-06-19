import React from 'react'
import Background from '../components/Background'
import logo from "../utils/Logo.jpeg"
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from "react-toastify"
const Logout = () => {
  const navigate = useNavigate();
  const submitHandler = async(e)=>{
    e.preventDefault();
    const response = await axios.post("/api/logout");
    if(response.status === 200){
      toast.success("You have been logged out")
      navigate("/dashboard")
    }
    else{
      toast.error("Something went wrong")
    }
  } 

  return (
    <div className="relative flex justify-center items-center overflow-hidden   min-h-screen min-w-screen bg-slate-300 dark:bg-black">
      <Background/>
      <div className="flex flex-col md:flex-row gap-5  justify-center items-center bg-[rgba(255, 255, 255, 0.1)] p-5   backdrop-blur-sm">
        {/* logo section */}
        <div className=" ">
          <img className="h-32 rounded-md " src={logo} alt="logo"/>
          <p className="text-lg font-semibold mt-3 text-slate-500">Shift Your Career into <br/> High Gear with JobSift.</p>
        </div>

        {/* partition */}
        <div className="md:h-96 md:w-0.5 h-0.5 w-96 bg-slate-700 dark:bg-slate-200"></div>
      
        <div className='text-slate-300 text-2xl flex flex-col items-center justify-center'>
            <h2>
              Do you want to log Out?
            </h2>
          <form className='flex gap-10 mt-10  '
          onSubmit={submitHandler}>
            <button 
            type='submit'
            className="px-4 py-1 bg-yellow-400 max-w-32 rounded-md self-center dark:text-slate-600 ">
              Yes
            </button>
            <button 
            type='Button'
            className="px-4 py-1 bg-yellow-400 max-w-32 rounded-md self-center dark:text-slate-600 "
            onClick={(e)=>{
              e.preventDefault();
              navigate(-1);
            }}>
              No
            </button>
          </form>
        </div>
        </div>
    </div>
  )
}

export default Logout