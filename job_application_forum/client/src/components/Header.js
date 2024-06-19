import React, { useContext } from "react";
import logo from "../utils/Logo.jpeg";
import { FaHome } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaSuitcase } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
const Header = () => {
  const { theme, toggleThemeChange } = useContext(AppContext);

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const userType = searchParams.get("userType");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
  };

  const navigate = useNavigate();
  return (
    <div className="px-2 py-1 bg-white dark:bg-inherit border-b border-b-slate-500 w-full flex justify-around text-xl items-center fixed left-0 top-0 right-0 z-50  ">
      {/* logo */}
      <div
        onClick={() => {
          navigate(`/dashboard?userType=${userType}`);
        }}
      >
        <img src={logo} className="h-[4.5rem] cursor-pointer" />
      </div>

      {/* navigation */}
      <nav>
        <ul className="flex gap-5">
          <li
            className="flex justify-center items-center gap-1  cursor-pointer dark:hover:text-yellow-300 hover:text-yellow-700"
            onClick={() => {
              navigate(`/dashboard?userType=${userType}`);
            }}
          >
            <FaHome /> Home
          </li>
          <li
            className="flex justify-center items-center gap-1 cursor-pointer dark:hover:text-yellow-300 hover:text-yellow-700 "
            onClick={() => {
              navigate(`/jobs?userType=${userType}`);
            }}
          >
            <FaSuitcase /> Jobs
          </li>
          <li
            className="flex justify-center items-center gap-1 cursor-pointer dark:hover:text-yellow-300 hover:text-yellow-700 "
            onClick={() => {
              navigate(`/applicant?userType=${userType}`);
            }}
          >
            <IoPerson /> Applicant
          </li>
          <li
            className="flex justify-center items-center gap-1  cursor-pointer dark:hover:text-yellow-300 hover:text-yellow-700"
            onClick={() => {
              navigate(`/contact-us?userType=${userType}`);
            }}
          >
            <FaPhoneAlt /> Contact Us
          </li>
        </ul>
      </nav>
      {/* user */}
      <div className="flex  gap-4">
        <div
          className="flex items-center gap-2 cursor-pointer dark:hover:text-yellow-300 hover:text-yellow-700"
          onClick={() => {
            navigate(`/profile?userType=${userType}`);
          }}
        >
          <FaUser />
          Profile
        </div>
        <div
          className="flex items-center gap-2 cursor-pointer dark:hover:text-yellow-300 hover:text-yellow-700"
          onClick={() => {
            navigate(`/logout?userType=${userType}`);
          }}
        >
          Logout
        </div>
      </div>
      <div>
        {theme === "dark" ? (
          <FaMoon onClick={toggleThemeChange} className="text-3xl cursor-pointer" />
        ) : (
          <FaSun onClick={toggleThemeChange} className="text-3xl cursor-pointer" />
        )}
      </div>
    </div>
  );
};

export default Header;
