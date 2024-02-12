import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { NavLink,useLocation } from "react-router-dom";
const CategoryPage = () => {
  const { type, apiKey, fetchData } = useContext(AppContext);
  const [pageData, setPageData] = useState({});
  const [loading, setLoading] = useState(true);
  const item = type.split("_")[0];
  const location  = useLocation();
  useEffect(() => {
    if (type !== "") {
      fetching();
    }
    // eslint-disable-next-line
  }, [type]);
  async function fetching() {
    setLoading(true);
    if (type.split("_").splice(-1)[0] === "trending") {
      const url = `https://api.themoviedb.org/3/trending/${item}/day?api_key=${apiKey}`;
      fetchData(url, setPageData);
    } else {
      const url = `https://api.themoviedb.org/3/${item}/${type
        .split("_")
        .splice(1)
        .join("_")}?api_key=8412ebcf0466f791448ccee20fcc30aa`;

      fetchData(url, setPageData);
    }

    setLoading(false);
  }
  return (
    <div>
      <Header />
      <div className="pt-24 dark:bg-slate-900">{loading ? <Loading /> : 
      <div className="dark:bg-slate-900">
        {(loading)? <Loading/> :
        ((Object.keys(pageData).length === 0)? "": <div className="flex flex-wrap gap-10 justify-evenly">
        {pageData.results.map((value, index) => (
          <NavLink to={`/${location.pathname.split("/")[1]}/${value.id}`} key={value.id}>
              <div key={index} className="h-[22rem] w-60 flex justify-around flex-col items-center">
                {((value.poster_path) ?(<img src={`https://image.tmdb.org/t/p/w500/${value.poster_path}`} className="h-72 w-full" alt={`${value.poster_path}`} />):(<div className="h-72 w-full flex justify-center items-center">Image Not Available</div> ))}
                
                <h3 className="text-xl font-bold">
                  {(value.original_title || value.original_name || "Title not available").length > 18 ?
                    `${(value.original_title || value.original_name).substring(0, 18)}...` :
                    value.original_title || value.original_name}
                </h3>
              </div>
            </NavLink>
          ))}
      
          </div> )
        }
        </div>}</div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
