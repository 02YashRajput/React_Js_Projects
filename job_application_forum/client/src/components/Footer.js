import React, { useRef } from "react";
import logo from "./../utils/Logo.jpeg";
import {
  FaInstagramSquare,
  FaGithub,
  FaLinkedin,
  FaFacebookSquare,
  FaEnvelope,
  FaFacebook,
} from "react-icons/fa";

function Footer() {
  const copyTagRef = useRef(null);

  const clickHandler = () => {
    if (copyTagRef.current) {
      copyTagRef.current.style.display = "block";
      navigator.clipboard.writeText("02yashrajput@gmail.com")
    }
    setTimeout(() => {
      if (copyTagRef.current) copyTagRef.current.style.display = "none";
    }, 1000);
  };

  return (
    <div className="flex flex-col py-10 border-t border-slate-500 items-center">
      <div className="flex flex-col items-center">
        <img src={logo} alt="logo" className="h-24 " />
        <h2 className="text-xl">
          Made By <span className="font-bold">Yash Rajput</span>{" "}
        </h2>
        <div className="flex gap-7 text-3xl">
          <div
            onClick={clickHandler}
            className="hover:bg-slate-900 hover:bg-opacity-15 dark:hover:bg-white dark:hover:bg-opacity-5 p-3 rounded-full relative"
          >
            <FaEnvelope />
            <div
              ref={copyTagRef}
              className="text-lg absolute left-1/2 -translate-x-1/2 top-0 -translate-y-[100%] bg-slate-700 text-white px-4 rounded-md hidden transition-all duration-200 ease-in-out"
            >
              copied
            </div>
          </div>
          <a
            href="https://www.instagram.com/iam_y.r/"
            className="hover:bg-slate-900 hover:bg-opacity-15 dark:hover:bg-white dark:hover:bg-opacity-5 p-3 rounded-full"
          >
            <FaInstagramSquare />
          </a>
          <a
            href="https://github.com/02YashRajput"
            className="hover:bg-slate-900 hover:bg-opacity-15 dark:hover:bg-white dark:hover:bg-opacity-5 p-3 rounded-full"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/yash-rajput-54b763282/"
            className="hover:bg-slate-900 hover:bg-opacity-15 dark:hover:bg-white dark:hover:bg-opacity-5 p-3 rounded-full"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100083846002768"
            className="hover:bg-slate-900 hover:bg-opacity-15 dark:hover:bg-white dark:hover:bg-opacity-5 p-3 rounded-full"
          >
            <FaFacebookSquare />
          </a>
        </div>
      </div>

      <div className="flex justify-evenly gap-10 items-start">
        <div>
          <h3 className="mb-4 text-xl font-semibold">Contact Us</h3>
          <ul>
            <li className="flex gap-2 items-center relative group">
              <FaEnvelope /> Email
              <div className="text-lg hidden absolute left-[100%] group-hover:block bg-slate-700 text-white px-4 rounded-md transition-all duration-200 ease-in-out">
                02yashrajput@gmail.com
              </div>
            </li>
            <li className="flex gap-2 items-center relative group">
              <FaInstagramSquare /> Instagram
              <div className="text-lg absolute hidden left-[100%] group-hover:block bg-slate-700 text-white px-4 rounded-md transition-all duration-200 ease-in-out">
                iam_y.r
              </div>
            </li>
            <li className="flex gap-2 items-center relative group">
              <FaFacebook /> FaceBook
              <div className="text-lg absolute hidden left-[100%] group-hover:block bg-slate-700 text-white px-4 rounded-md transition-all duration-200 ease-in-out">
                YashRajput
              </div>
            </li>
            <li className="flex gap-2 items-center relative group">
              <FaGithub /> Github
              <div className="text-lg absolute hidden left-[100%] group-hover:block bg-slate-700 text-white px-4 rounded-md transition-all duration-200 ease-in-out">
                02YashRajput
              </div>
            </li>
            <li className="flex gap-2 items-center relative group">
              <FaLinkedin /> Linkedin
              <div className="text-lg absolute hidden left-[100%] group-hover:block bg-slate-700 text-white px-4 rounded-md transition-all duration-200 ease-in-out">
                YashRajput
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
