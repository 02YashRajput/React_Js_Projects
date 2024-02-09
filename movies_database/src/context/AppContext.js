
import { createContext, useState,useEffect} from "react";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const apiKey = "8412ebcf0466f791448ccee20fcc30aa";
  const [name,setName] = useState("")
    const [theme, setTheme] = useState("light");
    const [isScrolled,setIsScrolled] = useState("false");
    console.log(name);
    useEffect(() => {
      const handleScroll = () => {
        const scrollTop = window.pageYOffset;
        setIsScrolled(scrollTop > 0);
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

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
        isScrolled,
        handleThemeChange,
        fetchData

    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
