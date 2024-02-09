import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FaMoon, FaSun } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Header = () => {
  const { theme, handleThemeChange, fetchData, setName, name } =
    useContext(AppContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData(name);
  };

  return (
    <div
      className={`bg-white dark:bg-slate-900 flex justify-around h-20 px-4 items-center border-b border-slate-500 fixed top-0 left-0 right-0 gap-5 shadow-md shadow-slate-500`}
    >
      {/* Left Section */}
      <div className="text-slate-500 dark:text-slate-500">
        <h1 className=" text-lg sm:text-lg md:text-xl  xl:text-4xl font-bold">
          Movies-DataBase
        </h1>
      </div>

      {/* middle Section */}
      <form onSubmit={handleSubmit} className="flex grow min-w-5 max-w-[720px]">
        <label className="border border-slate-500  h-10 grow flex min-w-0 ">
          <input
            onChange={(event) => {
              setName(event.target.value.split(" ").join("-"));
            }}
            type="search"
            className="min-w-0 grow outline-none text-lg px-2 bg-transparent text-slate-500"
            placeholder="Search"
          />
          <button type="submit" className="flex items-center px-4 bg-slate-500">
            <FaMagnifyingGlass className="text-lg text-slate-900" />
          </button>
        </label>
      </form>

      {/* Right Section */}
      <div className="flex gap-5 ">
        <p className="hidden lg:block text-slate-500">Home</p>
        <p className="hidden lg:block text-slate-500">Movies</p>
        <p className="hidden lg:block text-slate-500">TV Shows</p>

        {theme === "dark" ? (
          <button onClick={handleThemeChange}>
            <FaSun className="text-slate-500 text-2xl" />
          </button>
        ) : (
          <button onClick={handleThemeChange}>
            <FaMoon className="text-slate-500 text-2xl" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
