import React, { useContext, memo } from "react";
import { AppContext } from "../context/AppContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

import ProductList from "../components/ProductList";
function Home() {
  const value = useContext(AppContext);
  

  return (
    <div className="relative dark:bg-slate-900  text-slate-500 flex flex-col justify-between min-h-screen">
      <Header />

      <div className="pt-20 px-5">
        <div className="flex justify-center gap-20 items-center mt-10">
          {value.categoryArr.map((cat, index: number) => {
            return (
              <div key={index}>
                <div className="flex flex-col justify-center items-center gap-3 rounded-sm">
                  <img src={cat.Image} alt={cat.name} className="w-32 h-32 rounded-sm" />
                  <p>{cat.name}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          {
            value.categoryArr.map((cat,index:number)=>{
              return(
                <ProductList key={index}  category={cat.name}/>
              )
            })
          }
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default memo(Home);
