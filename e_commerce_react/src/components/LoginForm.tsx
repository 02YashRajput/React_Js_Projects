import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { IoClose } from "react-icons/io5";

function LoginForm() {
    const value = useContext(AppContext)
    const clickhandler = () => {
        const loginForm = document.querySelector<HTMLDivElement>("#login-pop-up")!;
        loginForm.style.display = "none";
        value.setShowPopUp(false);
      };
  return (
    <div
          id="login-pop-up"
          className="absolute top-0 left-0 right-0  bottom-0 min-h-screen flex items-center justify-center backdrop-blur-sm text-lg"
        >
    <div className="relative border border-slate-500 py-10">
            <button
              className=" text-red-500 text-3xl absolute top-5 right-5"
              onClick={clickhandler}
            >
              <IoClose />
            </button>
            
    <form
              onSubmit={(event) => value.submitHandler(event)}
              className=" p-10 pb-16 flex flex-col gap-5  relative "
            >
              <label className="flex grow justify-between pl-5 items-center text-2xl dark:text-slate-500">
                Name :
                <input
                  type="text"
                  id="user-name"
                  name="user-name"
                  className="border border-slate-500 ml-1 outline-none pl-2 dark:bg-slate-900 "
                  placeholder="User Name"
                />
              </label>
              <label className="flex grow justify-between pl-5 items-center text-2xl dark:text-slate-500">
                Email :
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="border border-slate-500 ml-1 outline-none pl-2 dark:bg-slate-900 "
                  placeholder="example.com"
                />
              </label>
              <label className='text-2xl dark:text-slate-500'>
                Password :
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="border border-slate-500 ml-1 outline-none pl-2 dark:bg-slate-900 "
                  placeholder="Password"
                />
              </label>
              <button className="border mt-10 border-blue-400 w-32 h-12 absolute bottom-0 left-1/2 -translate-x-1/2 hover:bg-blue-400 hover:text-white text-2xl transition-all duration-200  rounded-sm dark:bg-slate-500 dark:text-slate-900 dark:border-slate-900 dark:hover:bg-slate-900 dark:hover:text-slate-500 dark:hover:border-slate-500">
                Login
              </button>
            </form>
          </div>
          </div>
  )
}

export default LoginForm