import {createContext , useEffect,useState} from "react"; 

export const AppContext = createContext();
export default function AppContextProvider({children}){
  const [userData,setUserData] = useState()

  const[theme,setTheme] = useState("dark");
  const toggleThemeChange = ()=>{
    setTheme(theme === "light" ? "dark" : "light");
  }
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const value = {
    userData,
    setUserData,
    theme,
    setTheme,
    toggleThemeChange
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
} 
