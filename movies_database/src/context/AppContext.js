import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const apiKey = "8412ebcf0466f791448ccee20fcc30aa";
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [theme, setTheme] = useState("light");
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

          })
      
    }catch(e){
      alert("Error fetch")
    }
    
    
  }
 

  const value = {
    theme,
    apiKey,
    name,
    setName,
    loading,
    setLoading,
    arr,
    handleThemeChange,
    fetchData,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
