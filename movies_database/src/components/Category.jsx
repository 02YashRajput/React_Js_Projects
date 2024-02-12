import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Loading from './Loading';
import { NavLink } from 'react-router-dom';

const Category = ({ value }) => {
  const { fetchData, apiKey } = useContext(AppContext);
  const [pageData, setPageData] = useState({});
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const genreIds = value.genres.map(genre => genre.id).join(',');

  useEffect(() => {
    fetching();
    // eslint-disable-next-line 
  }, []);
  
  async function fetching() {
    setLoading(true);
    const url = `https://api.themoviedb.org/3/discover/${location.pathname.split("/")[1]}?api_key=${apiKey}&with_genres=${genreIds}`;
    await fetchData(url, setPageData);
    setLoading(false);
  }

  return (
    <div className='mt-20'>
      <h1 className='text-4xl'>Similar {(location.pathname.split("/")[1] === "tv" ? "Tv Shows" : "Movies")}</h1>
      <div>
        {loading ? <Loading /> : (
          <div className='flex flex-wrap gap-10 justify-evenly'>
            {pageData.results.map((value, index) => (
              <NavLink to={`/${location.pathname.split("/")[1]}/${value.id}`} key={value.id}>
                <div key={index} className="h-[22rem] w-60 flex justify-around flex-col items-center">
                  <img src={`https://image.tmdb.org/t/p/w500/${value.poster_path}`} className="h-72 w-full" alt={`${value.poster_path}`} />
                  <h3 className="text-xl font-bold">
                    {(value.original_title || value.original_name || "Title not available").length > 18 ?
                      `${(value.original_title || value.original_name).substring(0, 18)}...` :
                      value.original_title || value.original_name}
                  </h3>
                </div>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Category;
