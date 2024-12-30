import React, { createContext, useState, useCallback, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

// Define types for context values
interface AppContextType {
  userType:string | null;
  setUserType :  React.Dispatch<React.SetStateAction<string | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  pageData: Record<string, any>; // Adjust based on actual data shape
  setPageData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  fetchData: (url: string) => Promise<void>;
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  toggleThemeChange: () => void;
}

// Create context with default value
export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
  children: ReactNode;
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const [userType,setUserType] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>("light");
  const [pageData, setPageData] = useState<Record<string, any>>({});
  const navigate = useNavigate();

  const toggleThemeChange = useCallback(() => {
    setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  useEffect(() => {
    const checkTheme = () => {
      const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDarkMode ? "dark" : "light");
    };

    checkTheme();
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", checkTheme);
    
    return () => {
      mediaQuery.removeEventListener("change", checkTheme);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const fetchData = useCallback(async (url: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api${url}`);
      
      setPageData(response.data);
      
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        navigate("/login");
      } else {
        console.error('Fetching error:', error);
        // Optionally, set an error state here
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const value: AppContextType = {
    setUserType,
    userType,
    loading,
    setLoading,
    pageData,
    setPageData,
    fetchData,
    theme,
    setTheme,
    toggleThemeChange,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
