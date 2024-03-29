import React, { useContext, useEffect } from "react";
import "./App.css";
import { AppContext } from "./context/AppContext";
import { Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import CheckoutPage from "./pages/CheckoutPage";
import CartPage from "./pages/CartPage";
import NotFound from "./components/NotFound";
import ProductDetail from "./pages/ProductDetail";
import WishList from "./pages/WishList";
import About from "./pages/About";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "./components/LoginForm";
function App() {
  const value = useContext(AppContext);

  const fetching = async () => {
    value.setLoading(true);
      const url = "https://fakestoreapi.com/products";
      await value.fetchData(url);
    value.setLoading(false);
  };

  useEffect(() => {
    fetching();
    // eslint-disable-next-line
  }, []);

  
  return (
    <div className="dark:bg-slate-900 text-slate-500">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {value.showPopUp && !value.isLoggedIn ? <LoginForm /> : null}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
