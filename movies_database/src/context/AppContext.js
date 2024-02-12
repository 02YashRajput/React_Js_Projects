import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const apiKey = "8412ebcf0466f791448ccee20fcc30aa";
  const [loading, setLoading] = useState(false);
  const [search, setsearch] = useState("");
  const [theme, setTheme] = useState("light");
  const [name,setName] =  useState("");
  const [type,setType] = useState("");
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
  const arr = {
    "movie": ["trending", "now_playing", "top_rated", "upcoming"],
    "tv": ["trending", "top_rated", "on_the_air", "airing_today"],
  };
  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  async function fetchData(url,setPageData,item = null,category = null ) {
    try{
      const res = await fetch(url);
      const data = await res.json();
      setPageData((prevData)=>{
        if(item!==null && category!==null){
          
          return {
            ...prevData,
            [`${item}_${category}`]: data.results, 
          }
          
        }
        else{
            return { ...data};
          }

          })
      
    }catch(e){
      alert("Error fetch")
    }
    
    
  }
 

  const value = {
    theme,
    apiKey,
    search,
    setsearch,
    loading,
    setLoading,
    type,setType,
    name,setName,
    pageData,setPageData,
    arr,
    handleThemeChange,
    fetchData,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
