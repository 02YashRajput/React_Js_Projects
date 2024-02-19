import React, { useState,useContext, useEffect } from "react";
import { FaMoon, FaSun,FaShoppingCart } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import logoImg from "../Images/Fake-Store-logos.jpeg"
import { useNavigate,NavLink  } from "react-router-dom";
import { FaUser } from "react-icons/fa";
function Header() {
  const value = useContext(AppContext);
  const navigate = useNavigate()
  const themeChangeHandler = () => {
    value.setIsDark(!value.isDark);
  };
  const clickHandler = ()=>{
    value.setShowPopUp(true);
  }
  useEffect(() => {
    if (value.isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [value.isDark]);

  const [scrolled, setScrolled] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      const offset = window.pageYOffset;
      if (offset > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  

  return (
    <div className={`fixed top-0 left-0 right-0 h-20 px-5 text-xl flex items-center justify-around bg-white dark:bg-slate-900 z-50 transition-all duration-200 
    ${
      scrolled ? "shadow-md shadow-slate-500 ":""
    }
    `}>
      {/* Left Section */}
      <div className="h-16 w-40 rounded-lg cursor-pointer" onClick={()=>{
        navigate("/")
      }}>
        <img src={logoImg} alt=""  className="h-full w-full rounded-lg"/>
      </div>

      {/*Middle Section  */}
      <div className="grow max-w-72">
        <ul className="flex justify-between ">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/contact-us">Contact Us</NavLink>
          </li>
         
        </ul>
      </div>

      {/* Right Section */}
      <div className="grow max-w-96 flex justify-around">
        <NavLink to="/wishlist">
        <button>Wishlist</button>
          </NavLink> 

        <NavLink to="/cart">
          <div className="flex gap-1">

        <FaShoppingCart className="text-2xl" />
        Cart
          </div>
        </NavLink>

        
        <button onClick={clickHandler}>
          {
            value.isLoggedIn? (
              <div className="flex gap-1">
              <FaUser className="text-2xl" />
              {value.user.userName.length >= 12 ? (`${value.user.userName.substring(0,9)}...`):(value.user.userName)}
              </div>
            ) : (
              <>
              Login
              </>
            )
          }
        </button>
        

        {value.isDark ? (
          <FaMoon className="cursor-pointer text-2xl" onClick={themeChangeHandler} />
        ) : (
          <FaSun className="cursor-pointer text-2xl" onClick={themeChangeHandler} />
        )}
      </div>
    </div>
  );
}

export default Header;
