import React, { useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
import { NavLink } from "react-router-dom";
function WishList() {
  const value = useContext(AppContext);
  const data = value.pageData.filter((item) =>
    value.wishlist.includes(item.id)
  );

  return (
    <div className="flex flex-col justify-between pt-24 min-h-screen">
      <Header />
      <div className="flex flex-wrap border border-slate-500 p-5 gap-5 ">
        {data.length === 0 ? (
          <div className="text-4xl self-center place-content-center">Empty</div>
        ) : (
          data.map((item, index) => [
            <NavLink key={index} to={`/product/${item.id}`}>
              <div className="border border-slate-500 p-5 w-60 gap-5  flex flex-col h-full">
                <img
                  src={item.image}
                  className="mx-auto my-auto"
                  alt={item.title}
                />
                <div className="relative">
                  <div className="h-0.5 w-[80%] bg-slate-500 absolute -top-3 left-1/2 -translate-x-1/2 "></div>
                  <h1 className=" ">{item.title}</h1>
                </div>
              </div>
            </NavLink>,
          ])
        )}
      </div>
      <Footer />
    </div>
  );
}

export default WishList;
