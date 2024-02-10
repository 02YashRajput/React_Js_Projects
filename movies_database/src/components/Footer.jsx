import React from "react";
import {
  FaInstagramSquare,
  FaGithub,
  FaLinkedin,
  FaFacebookSquare,
  FaEnvelope
} from "react-icons/fa";
const Footer = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 flex flex-col justify-center items-center h-64   text-slate-500 gap-y-5 border-t border-slate-500">
      <div className="text-4xl  font-bold">Movies-DataBase</div>
      <div className="flex gap-7 text-3xl ">
        <a href="/"  className=" hover:bg-slate-900 hover:bg-opacity-15 dark:hover:bg-white dark:hover:bg-opacity-5 p-3 rounded-full">
        <FaEnvelope />

        </a>
        <a href="https://www.instagram.com/iam_y.r/"  className=" hover:bg-slate-900 hover:bg-opacity-15 dark:hover:bg-white dark:hover:bg-opacity-5 p-3 rounded-full">
          <FaInstagramSquare />
        </a>
        <a href="https://github.com/02YashRajput"  className=" hover:bg-slate-900 hover:bg-opacity-15 dark:hover:bg-white dark:hover:bg-opacity-5 p-3 rounded-full">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/yash-rajput-54b763282/" className=" hover:bg-slate-900 hover:bg-opacity-15 dark:hover:bg-white dark:hover:bg-opacity-5 p-3 rounded-full">
          <FaLinkedin />
        </a>
        <a href="https://www.facebook.com/profile.php?id=100083846002768" className=" hover:bg-slate-900 hover:bg-opacity-15 dark:hover:bg-white dark:hover:bg-opacity-5 p-3 rounded-full">
          <FaFacebookSquare />
        </a>
      </div>
      <div>
        Made By- <span className="text-xl font-bold">Yash Rajput</span> 
      </div>
    </div>
  );
};

export default Footer;
