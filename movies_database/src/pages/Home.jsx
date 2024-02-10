import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";
import Container from "../components/Container";

const Home = () => {
  const { arr, fetchData, apiKey,loading,setLoading } = useContext(AppContext);

  const [pageData, setPageData] = useState({
    movie_trending: [],
    movie_now_playing: [],
    movie_top_rated: [],
    movie_upcoming: [],
    tv_trending: [],
    tv_top_rated: [],
    tv_on_the_air: [],
    tv_airing_today: [],
  });

  async function fetching(){
    
    for (let item in arr) {
      setLoading(true);
      await arr[item].forEach((category) => {
        if (category === "trending") {
          const url = `https://api.themoviedb.org/3/trending/${item}/day?api_key=${apiKey}`;
           fetchData(url, setPageData, item, category);
        } else {
          const url = `https://api.themoviedb.org/3/${item}/${category}?api_key=8412ebcf0466f791448ccee20fcc30aa`;
  
          fetchData(url, setPageData, item, category);
        }
      });

    }
    setLoading(false);
  }

  useEffect(() => {
    fetching();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900  pt-28 gap-5 pb-72 px-4 relative flex flex-col justify-center items-center">
      <Header />

      {!loading ? (
        Object.entries(pageData).map(([itemName, value], index) => (
          <Container itemName={itemName} key={index} data={value} />
        ))
      ) : (
        <Loading />
      )}

      <Footer />
    </div>
  );
};

export default Home;
