import { createContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import electronics from "../Images/Electronics.webp";
import mens_clothing from "../Images/MenClothing.jpg";
import womens_clothing from "../Images/WomenClothing.jpg";

import jewelery from "../Images/jwellery.jpg";
type AppContextType = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: (url: string) => Promise<void>;
  pageData:  pageDatatype[];
  setPageData: React.Dispatch<
    React.SetStateAction< pageDatatype[]>
  >;
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  submitHandler: (event: React.FormEvent<HTMLFormElement>) => void;
  user: usertype;
  setUser: React.Dispatch<React.SetStateAction<usertype>>;
  showPopUp: boolean;
  setShowPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  categoryArr: { name: string; Image: string }[];
  wishlist: number[];
  setWishList: React.Dispatch<React.SetStateAction<number[]>>;
  cartlist: number[];
  setCartList: React.Dispatch<React.SetStateAction<number[]>>;
  checkoutList: number[];
  setCheckoutList: React.Dispatch<React.SetStateAction<number[]>>
  filterByCategory: (category: string) => pageDatatype[];
  toggleWishList: (id: number) => void,
  toggleCartList: (id: number) => void,
  
};
type pageDatatype = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};
type usertype = {
  userName: string;
  email: string;
  password: string;
};
export const AppContext = createContext({} as AppContextType);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const categoryArr = [
    { name: "electronics", Image: electronics },
    { name: "jewelery", Image: jewelery },
    { name: "men's clothing", Image: mens_clothing },
    { name: "women's clothing", Image: womens_clothing },
  ];

  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState< pageDatatype[]>([]);
  const filterByCategory = (
    category: string
  ):  pageDatatype[] => {
   
      return pageData.filter((item) => item.category === category);
   
  };

  const [isDark, setIsDark] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({} as usertype);
  const [showPopUp, setShowPopUp] = useState(true);
  const [wishlist, setWishList] = useState<number[]>([]);
  const [cartlist, setCartList] = useState<number[]>([]);
  const [checkoutList,setCheckoutList] = useState<number[]>([]);

  const notifyWarn = () =>
    toast.warn("Enter Email and Password!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifySuccess = () =>
    toast.success("🦄 Wow so easy!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const toggleWishList = (id:number)=>{
    if(wishlist.includes(id)){
      
      setWishList(wishlist.filter(wishlistId => wishlistId !== id));
      
    }
    else{
      setWishList([...wishlist,id]);
    }
  } 

  const toggleCartList = (id:number) =>{
    if(cartlist.includes(id)){
      setCartList(cartlist.filter(itemid => itemid!==id))
    }else{
      setCartList([...cartlist,id])
    }
  }

  const fetchData = async (url: string) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPageData(data);
    } catch (e) {
      console.log(e);
    }
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const emailValue = formData.get("email") as string;
    const passwordValue = formData.get("password") as string;
    const username = formData.get("user-name") as string;

    if (emailValue !== "" && passwordValue !== "" && username !== "") {
      notifySuccess();
      console.log("Email:", emailValue);
      console.log("Password:", passwordValue);
      setUser({
        userName: username,
        email: emailValue,
        password: passwordValue,
      });
      setIsLoggedIn(true);
    } else {
      console.log("hello");
      notifyWarn();
    }
  };
  const value = {
    loading,
    setLoading,
    fetchData,
    pageData,
    setPageData,
    isDark,
    setIsDark,
    isLoggedIn,
    setIsLoggedIn,
    submitHandler,
    user,
    setUser,
    showPopUp,
    setShowPopUp,
    categoryArr,
    filterByCategory,
    wishlist,
    setWishList,
    cartlist,
    setCartList,
    toggleWishList,
    toggleCartList,
    checkoutList,
    setCheckoutList
  };
  return <AppContext.Provider value={value}>{children} </AppContext.Provider>;
};
export default AppContextProvider;
