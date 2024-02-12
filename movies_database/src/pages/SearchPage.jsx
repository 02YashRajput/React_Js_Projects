import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import { useLocation,NavLink } from "react-router-dom";

const SearchPage = () => {
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState({});
  const { apiKey, fetchData, name } = useContext(AppContext);
  const location = useLocation();
  useEffect(() => {
    fetching();
    // eslint-disable-next-line
  }, [name]);

  async function fetching() {
    setLoading(true);
    const url = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${name}`;
    await fetchData(url, setPageData);
    setLoading(false);
  }

  return (
    <div>
      <Header />
      {loading ? (
        <Loading />
      ) : pageData.results.length <= 0 ? (
        <div className="mt-24 ">Not Found</div>
      ) : (
        <div className="pt-28 text-slate-500 dark:bg-slate-900 ">
          <h1 className="text-3xl font-bold ml-8 mb-10 ">Search Results for {`${name}`}</h1>
          <div className="flex flex-wrap gap-10 justify-evenly">
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
        
            </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default SearchPage;
