
import { createContext, useState,useEffect} from "react";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
    const [theme, setTheme] = useState("light");
    const [isScrolled,setIsScrolled] = useState("false");

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
    const value = {
        theme,
        isScrolled,
        handleThemeChange
    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
