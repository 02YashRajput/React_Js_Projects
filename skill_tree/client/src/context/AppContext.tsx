import React, { createContext, useState, useCallback, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

// Define types for context values
interface AppContextType {
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
  const [loading, setLoading] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>("light");

  const toggleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const checkTheme = () => {
      const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDarkMode ? "dark" : "light");
    };

    // Initial check
    checkTheme();

    // Add event listener to detect theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", checkTheme);

    // Cleanup event listener on component unmount
    return () => {
      mediaQuery.removeEventListener("change", checkTheme);
    };
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const [pageData, setPageData] = useState<Record<string, any>>({});
  const navigate = useNavigate();

  // Use useCallback to memoize fetchData function
  const fetchData = useCallback(async (url: string) => {
    setLoading(true); // Start loading

    try {
      const response = await axios.get(`/api${url}`);
      setPageData(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        navigate("/login");
      } else {
        console.error('Fetching error:', error);
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const value: AppContextType = {
    loading,
    setLoading,
    pageData,
    setPageData,
    fetchData,
    theme,
    setTheme,
    toggleThemeChange
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
