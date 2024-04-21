import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify"
import './Login.css'
import logo from "../utils/Logo.jpeg"
import Background from "../components/Background";
const Login = () => {
  const navigate = useNavigate();

  const loginSubmitHandler = async (e)=>{
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const emailValue = formData.get("email");
    const passwordValue = formData.get("password");
    try{
      if(!emailValue) throw new Error("Please enter an email");
      if(!passwordValue) throw new Error("Please enter a password");
      const response = await axios.post("/api/login", {
        email: emailValue,
        password: passwordValue,
      });
      if (response.status === 200) toast.success("Logged In successfully");
      navigate('/')
    }
    catch(err){
      if (
              err.message === "Please enter an email" ||
              err.message === "Please enter a password"
            ) {
              toast.error(err.message);
            } else {
              toast.error("invalid Email or Password");
            }
            console.log(err);
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
        {/* user input */}
        <div className=" w-[28rem] p-10 flex flex-col ">
          <p
            onClick={() => {
              navigate("/sign-up");
            }}
            className="self-end mr-5  dark:text-yellow-400 text-rose-600 cursor-pointer"
          >
            New User -&gt;
          </p>
          <form onSubmit={loginSubmitHandler} className="flex flex-col gap-7 text-xl mt-2 dark:text-slate-200 ">

            <label className="flex flex-col gap-2">
              <h3>Email</h3>
              <input
                type="email"
                name= "email"
                placeholder="Email"
                className="border border-slate-950 outline-none dark:border-slate-200  bg-transparent   p-1 rounded-md "
              />
            </label>
            <label className="flex flex-col gap-2">
              <h3>Password</h3>
              <input
                type="password"
                name = "password"
                placeholder="Password"
                className="border border-slate-950 outline-none dark:border-slate-200  bg-transparent  p-1 rounded-md "
              />
            </label>
            <button className="px-4 py-1 bg-yellow-400 max-w-32 rounded-md self-center dark:text-slate-600 ">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
