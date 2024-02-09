
import { createContext, useState,useEffect} from "react";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const apiKey = "8412ebcf0466f791448ccee20fcc30aa";
  const [name,setName] = useState("")
    const [theme, setTheme] = useState("light");
   
    
    

    const handleThemeChange = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

     

    useEffect(()=>{
        if(theme === "dark"){
          document.documentElement.classList.add("dark")
        }else{
          document.documentElement.classList.remove("dark")
        }
    
      },[theme])

    async function fetchData(name=""){
      if(name !== ""){
        const url = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${name}`
        const res = await fetch(url);
        const data = await res.json();
        console.log(data)
      } 
    } 

    const value = {
        theme,
        name,
        setName,
      
        handleThemeChange,
        fetchData

    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
