import React, { useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
import { NavLink } from "react-router-dom";
function CartPage() {
  const value = useContext(AppContext);
  const data = value.pageData.filter((item) =>
    value.cartlist.includes(item.id)
  );

  const count = data.reduce((sum, item) => sum + item.price, 0);
  return (
    <div className="flex flex-col justify-between pt-24 min-h-screen">
      <Header />
      <div className="flex flex-col flex-wrap p-10 justify-center items-center   gap-8">
        <div className=" flex flex-col border-2 border-slate-500  w-[60%] gap-5 p-5">
          {data.length === 0 ? (
            <div className="text-4xl self-center place-content-center">
              Empty
            </div>
          ) : (
            data.map((item, index) => [
              <div className="border border-slate-500 p-5 flex relative items-center gap-5 ">
                <NavLink key={index} to={`/product/${item.id}`}>
                  <img src={item.image} className="h-40" alt={item.title} />
                </NavLink>
                <div className="h-36 w-0.5 bg-slate-500"></div>
                <div className="flex flex-col gap-2 ">
                  <NavLink key={index} to={`/product/${item.id}`}>
                    <h1>{item.title}</h1>
                  </NavLink>

                  <p className="text-yellow-700 dark:text-yellow-300 font-bold">
                    {item.price}$
                  </p>
                  <div>
                    <button onClick={()=>{value.toggleCartList(item.id)}} className="bg-yellow-500 text-white p-3 text-xl flex-none  rounded-sm ">
                      Remove from Cart
                    </button>
                  </div>
                </div>
              </div>,
            ])
          )}
        </div>
        <div className=" flex flex-col border-2 border-slate-500  w-[60%] gap-5 p-5 ">
          {data.length === 0
            ? null
            : data.map((item, index) => [
                <div className=" flex  gap-5 ">
                  <div className="dark:text-yellow-300 text-yellow-700">
                    {index + 1}
                  </div>
                  <div>{item.title} ---</div>
                  <div className="font-bold">{item.price}$</div>
                </div>,
              ])}
          <div className="font-bold">Total = {count}$</div>
          <div>
            <div>
              <NavLink
                to={"/checkout"}
                onClick={() => {
                  value.setCheckoutList(value.cartlist);
                }}
              >
                <button className="bg-yellow-500 text-white p-3 text-xl flex-none  rounded-sm ">
                  Checkout
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CartPage;
