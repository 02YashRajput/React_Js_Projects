import React, { useContext} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { NavLink, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
function ProductDetail() {
  const location = useLocation();
  const id = parseInt(location.pathname.split("/").splice(-1)[0]) ;
  const value = useContext(AppContext);
  const data = value.pageData.filter((item)=>{return item.id === id})
 
  return (
    <div className="relative dark:bg-slate-900  text-slate-500 flex flex-col justify-between min-h-screen pt-24">
      <Header />
        <div className="grow flex px-10 gap-5 ">
          <div className="relative">
          {
          value.wishlist.includes(data[0].id) ? (<FaHeart className="absolute top-5 right-5 text-red-500 text-4xl z-20 cursor-pointer"  onClick={()=>{value.toggleWishList(data[0].id)}}  />) : (<CiHeart className="absolute top-5 right-5 text-red-500 text-4xl z-20 cursor-pointer" onClick={()=>{value.toggleWishList(data[0].id)}} />)
        }
          <img src={data[0].image} alt={data[0].title} className="h-96 border-2 border-slate-500  p-1 rounded-sm"/>
          </div>
          <div className="py-5 flex flex-col gap-2 max-w-[950px]">
              <h1 className="text-3xl font-bold">{data[0].title}</h1>
              <h3 className="text-xl">{data[0].description}</h3>
              <h3 className="text-3xl">{data[0].price}$ </h3>
              <h3>Rating: <span className="text-yellow-500">{data[0].rating.rate}</span> <br/> Count: {data[0].rating.count}</h3>
              <div className="flex gap-3 items-center">
                {
                  !value.cartlist.includes(data[0].id) ? (<button onClick={()=>{value.toggleCartList(data[0].id)}} className="bg-yellow-500 text-white p-3 text-3xl rounded-sm" >Add to Cart</button>) :(<button onClick={()=>{value.toggleCartList(data[0].id)}} className="bg-yellow-500 text-white p-3 text-3xl rounded-sm" >Remove from Cart</button>)
                }
                <NavLink to="/checkout" onClick={()=>{value.setCheckoutList([data[0].id])}}>
                  <button className="bg-yellow-500 text-white p-3 text-3xl rounded-sm">Buy Now</button>
                </NavLink>
              </div>
          </div>
        </div>
      <Footer />
    </div>
  );
}

export default ProductDetail;
